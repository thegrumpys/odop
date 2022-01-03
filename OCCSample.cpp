//
//  OCCSample
//
//  Created by Brian D. Watt on 12/26/21.
//

#include <BRepBuilderAPI_MakeEdge.hxx>
#include <BRepBuilderAPI_MakeFace.hxx>
#include <BRepBuilderAPI_MakeWire.hxx>
#include <BRepBuilderAPI_Transform.hxx>
#include <BRepLib.hxx>
#include <BRepMesh_IncrementalMesh.hxx>
#include <BRepOffsetAPI_MakePipe.hxx>
#include <BRepPrimAPI_MakeBox.hxx>
#include <BRepPrimAPI_MakePrism.hxx>
#include <BRepTools.hxx>
#include <GCE2d_MakeSegment.hxx>
#include <GC_MakeCircle.hxx>
#include <Geom2d_TrimmedCurve.hxx>
#include <Geom_CylindricalSurface.hxx>
#include <StlAPI_Writer.hxx>
#include <TopExp.hxx>
#include <TopoDS_Edge.hxx>
#include <TopoDS_Face.hxx>
#include <TopoDS_Shape.hxx>
#include <gp_Circ.hxx>
#include <gp_Lin2d.hxx>
#include <gp_Pnt.hxx>
#include <gp_Pnt2d.hxx>
#include <gp_Trsf.hxx>
#include <iostream>

using namespace std;

int main(int argc, const char * argv[]) {

    std::cout << "Starting OCCSample\n";

    try {
        Standard_Real in2mm = 25.4;
        Standard_Real OD_Free = 1.1;
        Standard_Real Wire_Dia = 0.1055;
        Standard_Real L_Free = 3.25;
        Standard_Real Coils_T = 16.0;
        Standard_Real Mean_Dia = 0.9945;
        Standard_Real Coils_A = 8.0;

        std::cout << "in2mm=" << in2mm << std::endl;
        std::cout << std::endl;

        std::cout << "OD_Free=" << OD_Free << std::endl;
        std::cout << "Wire_Dia=" << Wire_Dia << std::endl;
        std::cout << "L_Free=" << L_Free << std::endl;
        std::cout << "Coils_T=" << Coils_T << std::endl;
        std::cout << "Mean_Dia=" << Mean_Dia << std::endl;
        std::cout << "OD_Free=" << Coils_A << std::endl;
        std::cout << std::endl;

//        gp_Pnt center(Mean_Dia / 2.0 * in2mm, 0.0, 0.0);
//        gp_Dir norm(0.0, -1.0, 0.0);
//        Standard_Real radius = Wire_Dia / 2.0 * in2mm;
//        Handle(Geom_Circle) aCircle = GC_MakeCircle(center, norm, radius);
//        TopoDS_Edge anEdge1 = BRepBuilderAPI_MakeEdge(aCircle);
//        TopoDS_Wire aWire = BRepBuilderAPI_MakeWire(anEdge1);
//        TopoDS_Face aFace = BRepBuilderAPI_MakeFace(aWire);

//        gp_Vec aPrismVec(0, OD_Free * in2mm, 0);
//        TopoDS_Shape shape = BRepPrimAPI_MakePrism(aFace, aPrismVec);

        Standard_Real aProfileRadius = Wire_Dia / 2.0 * in2mm;
        Standard_Real aHelixRadius = Mean_Dia / 2.0 * in2mm;
        Standard_Real aClosedHelixPitch = Wire_Dia * in2mm;
        Standard_Real aClosedHelixHeight = Wire_Dia * (Coils_T - Coils_A) / 2.0 * in2mm;
        Standard_Real aClosedHelixCoils = (Coils_T - Coils_A) / 2.0;
//        Standard_Real aClosedHelixHypotenuse = 6.831; // base 2.0 * M_PI, height aClosedHelixPitch
        Standard_Real aClosedHelixHypotenuse = sqrt((2.0 * M_PI * 2.0 * M_PI) + (aClosedHelixPitch * aClosedHelixPitch));
        Standard_Real aCenterHelixPitch = (L_Free - Wire_Dia * (Coils_T - Coils_A)) / Coils_A * in2mm;
        Standard_Real aCenterHelixHeight = L_Free * in2mm - Wire_Dia * (Coils_T - Coils_A) * in2mm;
        Standard_Real aCenterHelixCoils = Coils_A;
//        Standard_Real aCenterHelixHypotenuse = 9.891; // base 2.0 * M_PI, height aCenterHelixPitch
        Standard_Real aCenterHelixHypotenuse = sqrt((2.0 * M_PI * 2.0 * M_PI) + (aCenterHelixPitch * aCenterHelixPitch));

        std::cout << "aProfileRadius=" << aProfileRadius << std::endl;
        std::cout << "aHelixRadius=" << aHelixRadius << std::endl;
        std::cout << "aClosedHelixPitch=" << aClosedHelixPitch << std::endl;
        std::cout << "aClosedHelixHeight=" << aClosedHelixHeight << std::endl;
        std::cout << "aClosedHelixCoils=" << aClosedHelixCoils << std::endl;
        std::cout << "aClosedHelixHypotenuse=" << aClosedHelixHypotenuse << std::endl;
        std::cout << "aCenterHelixPitch=" << aCenterHelixPitch << std::endl;
        std::cout << "aCenterHelixHeight=" << aCenterHelixHeight << std::endl;
        std::cout << "aCenterHelixCoils=" << aCenterHelixCoils << std::endl;
        std::cout << "aCenterHelixHypotenuse=" << aCenterHelixHypotenuse << std::endl;
        std::cout << std::endl;

        // Profile Face
        gp_Ax2 anAxis;
        anAxis.SetDirection(gp_Dir(0.0, -1.0, 0.0));
        anAxis.SetLocation(gp_Pnt(aHelixRadius, 0.0, 0.0));
        gp_Circ aProfileCircle(anAxis, aProfileRadius);
        TopoDS_Edge aProfileEdge = BRepBuilderAPI_MakeEdge(aProfileCircle).Edge();
        TopoDS_Wire aProfileWire = BRepBuilderAPI_MakeWire(aProfileEdge).Wire();
        TopoDS_Face aProfileFace = BRepBuilderAPI_MakeFace(aProfileWire).Face();

        // Common, Closed, and Center Helix
        gp_Ax2 aBottomHelixOrigin(gp_Pnt(0.0, 0.0, 0.0), gp_Dir(0.0, 0.0, 1.0));
        Handle(Geom_CylindricalSurface) aBottomHelixCylinder = new Geom_CylindricalSurface(aBottomHelixOrigin, aHelixRadius);
        gp_Ax2 aCenterHelixOrigin(gp_Pnt(0.0, 0.0, aClosedHelixHeight), gp_Dir(0.0, 0.0, 1.0));
        Handle(Geom_CylindricalSurface) aCenterHelixCylinder = new Geom_CylindricalSurface(aCenterHelixOrigin, aHelixRadius);
        gp_Ax2 aTopHelixOrigin(gp_Pnt(0.0, 0.0, aClosedHelixHeight+aCenterHelixHeight), gp_Dir(0.0, 0.0, 1.0));
        Handle(Geom_CylindricalSurface) aTopHelixCylinder = new Geom_CylindricalSurface(aTopHelixOrigin, aHelixRadius);
//        gp_Trsf aTrsf;

        // Create Bottom Helix
        gp_Lin2d aBottomHelixLine2d(gp_Pnt2d(0.0, 0.0), gp_Dir2d(2. * M_PI, aClosedHelixPitch));
        Handle(Geom2d_TrimmedCurve) aBottomHelixSegment = GCE2d_MakeSegment(aBottomHelixLine2d, 0.0, 2.0 * M_PI).Value();
//        aBottomHelixSegment->DumpJson(std::cout);
        TopoDS_Edge aBottomHelixEdge = BRepBuilderAPI_MakeEdge(aBottomHelixSegment, aBottomHelixCylinder, 0.0, aClosedHelixCoils * aClosedHelixHypotenuse).Edge();
//        BRepTools::Dump(aBottomHelixEdge, std::cout);
//        TopoDS_Vertex aBottomHelixVertex1 = TopExp::FirstVertex(aBottomHelixEdge);
//        BRepTools::Dump(aBottomHelixVertex1, std::cout);
//        gp_Pnt aBottomHelixPoint1 = BRep_Tool::Pnt(aBottomHelixVertex1);
//        std::cout << "X=" << aBottomHelixPoint1.X() << " Y=" << aBottomHelixPoint1.Y() << " Z=" << aBottomHelixPoint1.Z() << std::endl;
//        TopoDS_Vertex aBottomHelixVertex2 = TopExp::LastVertex(aBottomHelixEdge);
//        BRepTools::Dump(aBottomHelixVertex2, std::cout);
//        gp_Pnt aBottomHelixPoint2 = BRep_Tool::Pnt(aBottomHelixVertex2);
//        std::cout << "X=" << aBottomHelixPoint2.X() << " Y=" << aBottomHelixPoint2.Y() << " Z=" << aBottomHelixPoint2.Z() << std::endl;
        BRepLib::BuildCurve3d(aBottomHelixEdge);

        // Create Center Helix
        gp_Lin2d aCenterHelixLine2d(gp_Pnt2d(0.0, 0.0), gp_Dir2d(2. * M_PI, aCenterHelixPitch));
        Handle(Geom2d_TrimmedCurve) aCenterHelixSegment = GCE2d_MakeSegment(aCenterHelixLine2d, 0.0, 2.0 * M_PI).Value();
//        aCenterHelixSegment->DumpJson(std::cout);
        TopoDS_Edge aCenterHelixEdge = BRepBuilderAPI_MakeEdge(aCenterHelixSegment, aCenterHelixCylinder, 0.0, aCenterHelixCoils * aCenterHelixHypotenuse).Edge();
//        BRepTools::Dump(aCenterHelixEdge, std::cout);
        BRepLib::BuildCurve3d(aCenterHelixEdge);

//        // Move Center Helix
//        aTrsf.SetTranslation(gp_Vec(0.0, 0.0, aClosedHelixHeight));
//        TopoDS_Shape aCenterHelixEdgeTransformed = BRepBuilderAPI_Transform(aCenterHelixEdge, aTrsf);

        // Create Top Helix
        gp_Lin2d aTopHelixLine2d(gp_Pnt2d(0.0, 0.0), gp_Dir2d(2. * M_PI, aClosedHelixPitch));
        Handle(Geom2d_TrimmedCurve) aTopHelixSegment = GCE2d_MakeSegment(aTopHelixLine2d, 0.0, 2.0 * M_PI).Value();
//        aTopHelixSegment->DumpJson(std::cout);
        TopoDS_Edge aTopHelixEdge = BRepBuilderAPI_MakeEdge(aTopHelixSegment, aTopHelixCylinder, 0.0, aClosedHelixCoils * aClosedHelixHypotenuse).Edge();
//        BRepTools::Dump(aTopHelixEdge, std::cout);
        BRepLib::BuildCurve3d(aTopHelixEdge);

//        // Move Top Helix
//        aTrsf.SetTranslation(gp_Vec(0.0, 0.0, aClosedHelixHeight+aCenterHelixHeight));
//        TopoDS_Shape aTopHelixEdgeTransformed = BRepBuilderAPI_Transform(aTopHelixEdge, aTrsf);

        TopoDS_Wire aHelixWire = BRepBuilderAPI_MakeWire(aBottomHelixEdge,aCenterHelixEdge,aTopHelixEdge).Wire();
//        TopoDS_Wire aHelixWire = BRepBuilderAPI_MakeWire(aBottomHelixEdge,aCenterHelixEdge).Wire();
//        TopoDS_Wire aHelixWire = BRepBuilderAPI_MakeWire(aBottomHelixEdge).Wire();
//        TopoDS_Wire aHelixWire = BRepBuilderAPI_MakeWire(aCenterHelixEdge).Wire();
//        TopoDS_Wire aHelixWire = BRepBuilderAPI_MakeWire(aTopHelixEdge).Wire();

        BRepOffsetAPI_MakePipe aHelixPipe(aHelixWire, aProfileFace);

//        gp_Vec aPrismVec(0.0, aHelixRadius, aCenterHelixPitch / 4.0);
//        TopoDS_Shape shape = BRepPrimAPI_MakePrism(aProfileFace, aPrismVec);

//        BRepPrimAPI_MakeBox mkBox(1., 2., 3.);
//        const TopoDS_Shape& shape = mkBox.Shape();

        if (aHelixPipe.IsDone()) {

            // "Problem with StlAPI_Writer in OCC 7.0.0"
            // at: https://dev.opencascade.org/content/problem-stlapiwriter-occ-700
            // Since version 6.9.0, STL writer relies on triangulation stored in the shape
            // for exporting STL data (see Release Notes of OCCT 6.9.0, issue 25357).
            // This allows better control over the quality of the triangulation
            // (in previous versions shape was triangulated by STL writer internally).
            // Use BRepMesh_IncrementalMesh to build triangulation before calling StlAPI_Writer.

            BRepMesh_IncrementalMesh mesh3(aHelixPipe, 0.01 ); // Perform mesh operation to generate STL file
            mesh3.Perform();

//        // DEBUGGING: calculate total number of the mesh nodes and triangles
//        Standard_Integer aNbNodes = 0;
//        Standard_Integer aNbTriangles = 0;
//        for (TopExp_Explorer anExpSF (shape, TopAbs_FACE); anExpSF.More(); anExpSF.Next())
//        {
//          TopLoc_Location aLoc;
//          Handle(Poly_Triangulation) aTriangulation = BRep_Tool::Triangulation (TopoDS::Face (anExpSF.Current()), aLoc);
//          if (! aTriangulation.IsNull())
//          {
//            aNbNodes += aTriangulation->NbNodes ();
//            aNbTriangles += aTriangulation->NbTriangles ();
//          }
//        }
//        std::cout << "aNbNodes=" << aNbNodes << " " << "aNbTriangles=" << aNbTriangles << std::endl;

            StlAPI_Writer writer;
            int result;
            result = writer.Write(aHelixPipe, "OCCSamplePrism.stl");
            std::cout << "result=" << (result==true ? "success" : "fail") << std::endl;
        }

    } catch(int &err) {

        std::cout << "err=" << err << std::endl;

    }

    std::cout << "Ending OCCSample\n";

    return 0;
}
