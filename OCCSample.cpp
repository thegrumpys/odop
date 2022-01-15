//
//  OCCSample
//
//  Created by Brian D. Watt on 12/26/21.
//

#include <BRepAlgoAPI_Fuse.hxx>
#include <BRepAlgoAPI_Cut.hxx>
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

    std::cout << "Starting OCCSample" << std::endl;

    try {
// End Type Table
//   [ "End_Type","Inactive_Coils","Add_Coils@Solid" ],
// 1 [ "Open",           0.0,       1.0],
// 2 [ "Open&Ground",    1.0,       0.0],
// 3 [ "Closed",         2.0,       1.0],
// 4 [ "Closed&Ground",  2.0,       0.0],
// 5 [ "Tapered_C&G",    2.0,      -0.5],
// 6 [ "Pig-tail",       2.0,       0.0],
// 7 [ "User_Specified", 0.0,       0.0]
        const int End_Type_Open = 1;
        const int End_Type_Open_Ground = 2;
        const int End_Type_Closed = 3;
        const int End_Type_Closed_Ground = 4;
        const int End_Type_Tapered_C_G = 5;
        const int End_Type_Pig_tail = 6;
        const int End_Type_User_Specified = 7;

        Standard_Real in2mm = 25.4;
        Standard_Real OD_Free = 1.1;
        Standard_Real Wire_Dia = 0.1055;
        Standard_Real L_Free = 3.25;
        Standard_Real Coils_T = 16.0;
        Standard_Real Mean_Dia = 0.9945;
        Standard_Real Coils_A = 8.0;
        Standard_Integer End_Type = 4;

        std::cout << "in2mm=" << in2mm << std::endl;
        std::cout << std::endl;

        std::cout << "OD_Free=" << OD_Free << std::endl;
        std::cout << "Wire_Dia=" << Wire_Dia << std::endl;
        std::cout << "L_Free=" << L_Free << std::endl;
        std::cout << "Coils_T=" << Coils_T << std::endl;
        std::cout << "Mean_Dia=" << Mean_Dia << std::endl;
        std::cout << "Coils_A=" << Coils_A << std::endl;
        std::cout << "End_Type=" << End_Type << std::endl;
        std::cout << std::endl;

        Standard_Real aSpringDiameter = OD_Free * in2mm;
        Standard_Real aSpringHeight = L_Free * in2mm;
        Standard_Real aProfileRadius = Wire_Dia / 2.0 * in2mm;
        Standard_Real aHelixRadius = Mean_Dia / 2.0 * in2mm;
        Standard_Real aClosedHelixPitch = Wire_Dia * in2mm;
        Standard_Real aClosedHelixHeight = Wire_Dia * (Coils_T - Coils_A) / 2.0 * in2mm;
        Standard_Real aClosedHelixCoils = (Coils_T - Coils_A) / 2.0;
        Standard_Real aClosedHelixHypotenuse = sqrt((2.0 * M_PI * 2.0 * M_PI) + (aClosedHelixPitch * aClosedHelixPitch));
        Standard_Real aCenterHelixPitch = (L_Free - Wire_Dia * (Coils_T - Coils_A)) / Coils_A * in2mm;
        Standard_Real aCenterHelixHeight = L_Free * in2mm - Wire_Dia * (Coils_T - Coils_A) * in2mm;
        Standard_Real aCenterHelixCoils = Coils_A;
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

        // Create Bottom Helix
        gp_Lin2d aBottomHelixLine2d(gp_Pnt2d(0.0, 0.0), gp_Dir2d(2. * M_PI, aClosedHelixPitch));
        Handle(Geom2d_TrimmedCurve) aBottomHelixSegment = GCE2d_MakeSegment(aBottomHelixLine2d, 0.0, 2.0 * M_PI).Value();
        TopoDS_Edge aBottomHelixEdge = BRepBuilderAPI_MakeEdge(aBottomHelixSegment, aBottomHelixCylinder, 0.0, aClosedHelixCoils * aClosedHelixHypotenuse).Edge();
        BRepLib::BuildCurve3d(aBottomHelixEdge);

        // Create Center Helix
        gp_Lin2d aCenterHelixLine2d(gp_Pnt2d(0.0, 0.0), gp_Dir2d(2. * M_PI, aCenterHelixPitch));
        Handle(Geom2d_TrimmedCurve) aCenterHelixSegment = GCE2d_MakeSegment(aCenterHelixLine2d, 0.0, 2.0 * M_PI).Value();
        TopoDS_Edge aCenterHelixEdge = BRepBuilderAPI_MakeEdge(aCenterHelixSegment, aCenterHelixCylinder, 0.0, aCenterHelixCoils * aCenterHelixHypotenuse).Edge();
        BRepLib::BuildCurve3d(aCenterHelixEdge);

        // Create Top Helix
        gp_Lin2d aTopHelixLine2d(gp_Pnt2d(0.0, 0.0), gp_Dir2d(2. * M_PI, aClosedHelixPitch));
        Handle(Geom2d_TrimmedCurve) aTopHelixSegment = GCE2d_MakeSegment(aTopHelixLine2d, 0.0, 2.0 * M_PI).Value();
        TopoDS_Edge aTopHelixEdge = BRepBuilderAPI_MakeEdge(aTopHelixSegment, aTopHelixCylinder, 0.0, aClosedHelixCoils * aClosedHelixHypotenuse).Edge();
        BRepLib::BuildCurve3d(aTopHelixEdge);

        // Create Total Helix Wire and Total Helix Pipe
        TopoDS_Wire aHelixWire = BRepBuilderAPI_MakeWire(aBottomHelixEdge,aCenterHelixEdge,aTopHelixEdge).Wire();
        BRepOffsetAPI_MakePipe aHelixPipe(aHelixWire, aProfileFace);

        // Create Bottom Cutter Box
        BRepPrimAPI_MakeBox aBottomHelixBox(aSpringDiameter, aSpringDiameter, aClosedHelixPitch);
        const TopoDS_Shape& aBottomHelixCutter = aBottomHelixBox.Shape();
        gp_Trsf aBottomTrsf;
        aBottomTrsf.SetTranslation(gp_Vec(-aSpringDiameter/2.0, -aSpringDiameter/2.0, -aClosedHelixPitch));
        TopoDS_Shape aBottomHelixCutterTransformed = BRepBuilderAPI_Transform(aBottomHelixCutter, aBottomTrsf);

        // Create Top Cutter Box
        BRepPrimAPI_MakeBox aTopHelixBox(aSpringDiameter, aSpringDiameter, aClosedHelixPitch);
        const TopoDS_Shape& aTopHelixCutter = aBottomHelixBox.Shape();
        gp_Trsf aTopTrsf;
        aTopTrsf.SetTranslation(gp_Vec(-aSpringDiameter/2.0, -aSpringDiameter/2.0, aSpringHeight));
        TopoDS_Shape aTopHelixCutterTransformed = BRepBuilderAPI_Transform(aTopHelixCutter, aTopTrsf);

        // Fuse Bottom and Top Cutter Boxes, and Cut them from Total Helix Pipe
        TopoDS_Shape aHelixCutter = BRepAlgoAPI_Fuse(aBottomHelixCutterTransformed, aTopHelixCutterTransformed);
        TopoDS_Shape aCompressionCutAndGround = BRepAlgoAPI_Cut(aHelixPipe, aHelixCutter);

        // Perform mesh operation and generate STL file
        BRepMesh_IncrementalMesh mesh(aCompressionCutAndGround, 0.1 );
        mesh.Perform();
        StlAPI_Writer writer;
        int result;
        result = writer.Write(aCompressionCutAndGround, "OCCSample.stl");
        std::cout << "result=" << (result==true ? "success" : "fail") << std::endl;

    } catch(int &err) {
        std::cout << "err=" << err << std::endl;
    }

    std::cout << "Ending OCCSample" << std::endl;
    return 0;
}
