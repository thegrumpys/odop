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
        enum End_Types {
            Open = 1,
            Open_Ground,
            Closed,
            Closed_Ground,
            Tapered_C_G,
            Pig_tail,
            User_Specified,
        };

        Standard_Real in2mm = 25.4;

        std::cout << "in2mm=" << in2mm << std::endl;
        std::cout << std::endl;

        Standard_Real OD_Free = 1.1;
        Standard_Real Wire_Dia = 0.1055;
        Standard_Real L_Free = 3.25;
        Standard_Real Coils_T = 14.0;
        Standard_Real Mean_Dia = 0.9945;
        Standard_Real Coils_A = 10.0;
        Standard_Integer End_Type = End_Types::Closed_Ground;

        std::cout << "OD_Free=" << OD_Free << std::endl;
        std::cout << "Wire_Dia=" << Wire_Dia << std::endl;
        std::cout << "L_Free=" << L_Free << std::endl;
        std::cout << "Coils_T=" << Coils_T << std::endl;
        std::cout << "Mean_Dia=" << Mean_Dia << std::endl;
        std::cout << "Coils_A=" << Coils_A << std::endl;
        std::cout << "End_Type=" << End_Type << std::endl;
        std::cout << std::endl;

        Standard_Real LevelOfDetail = 20; // Level of Detail
        Standard_Real LinearDeflection = Mean_Dia/LevelOfDetail;

        std::cout << "LevelOfDetail=" << LevelOfDetail << std::endl;
        std::cout << "LinearDeflection=" << LinearDeflection << std::endl;
        std::cout << std::endl;

        Standard_Real aProfileRadius = Wire_Dia / 2.0 * in2mm;
        Standard_Real aHelixRadius = Mean_Dia / 2.0 * in2mm;
        Standard_Real aClosedHelixPitch = Wire_Dia * in2mm;
        Standard_Real aClosedHelixHeight = Wire_Dia * (Coils_T - Coils_A) / 2.0 * in2mm;
        Standard_Real aClosedHelixCoils = (Coils_T - Coils_A) / 2.0;
        Standard_Real aClosedHelixHypotenuse = sqrt((2.0 * M_PI * 2.0 * M_PI) + (aClosedHelixPitch * aClosedHelixPitch));
        Standard_Real aCutterWidth = OD_Free * in2mm;
        Standard_Real aCutterHeight = L_Free * in2mm;
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
        std::cout << "Profile Face" << std::endl;
        gp_Ax2 anAxis;
        anAxis.SetDirection(gp_Dir(0.0, -1.0, 0.0));
        anAxis.SetLocation(gp_Pnt(aHelixRadius, 0.0, 0.0));
        gp_Circ aProfileCircle(anAxis, aProfileRadius);
        TopoDS_Edge aProfileEdge = BRepBuilderAPI_MakeEdge(aProfileCircle).Edge();
        TopoDS_Wire aProfileWire = BRepBuilderAPI_MakeWire(aProfileEdge).Wire();
        TopoDS_Face aProfileFace = BRepBuilderAPI_MakeFace(aProfileWire).Face();

        TopoDS_Edge aBottomHelixEdge;
        TopoDS_Edge aTopHelixEdge;
        if (End_Type == End_Types::Closed || End_Type == End_Types::Closed_Ground) {
            // Create Bottom Helix
            std::cout << "Create Bottom Helix" << std::endl;
            gp_Ax2 aBottomHelixOrigin(gp_Pnt(0.0, 0.0, 0.0), gp_Dir(0.0, 0.0, 1.0));
            Handle(Geom_CylindricalSurface) aBottomHelixCylinder = new Geom_CylindricalSurface(aBottomHelixOrigin, aHelixRadius);
            gp_Lin2d aBottomHelixLine2d(gp_Pnt2d(0.0, 0.0), gp_Dir2d(2. * M_PI, aClosedHelixPitch));
            Handle(Geom2d_TrimmedCurve) aBottomHelixSegment = GCE2d_MakeSegment(aBottomHelixLine2d, 0.0, 2.0 * M_PI).Value();
            aBottomHelixEdge = BRepBuilderAPI_MakeEdge(aBottomHelixSegment, aBottomHelixCylinder, 0.0, aClosedHelixCoils * aClosedHelixHypotenuse).Edge();
            BRepLib::BuildCurve3d(aBottomHelixEdge);

            // Create Top Helix
            std::cout << "Create Top Helix" << std::endl;
            gp_Ax2 aTopHelixOrigin(gp_Pnt(0.0, 0.0, aClosedHelixHeight+aCenterHelixHeight), gp_Dir(0.0, 0.0, 1.0));
            Handle(Geom_CylindricalSurface) aTopHelixCylinder = new Geom_CylindricalSurface(aTopHelixOrigin, aHelixRadius);
            gp_Lin2d aTopHelixLine2d(gp_Pnt2d(0.0, 0.0), gp_Dir2d(2. * M_PI, aClosedHelixPitch));
            Handle(Geom2d_TrimmedCurve) aTopHelixSegment = GCE2d_MakeSegment(aTopHelixLine2d, 0.0, 2.0 * M_PI).Value();
            aTopHelixEdge = BRepBuilderAPI_MakeEdge(aTopHelixSegment, aTopHelixCylinder, 0.0, aClosedHelixCoils * aClosedHelixHypotenuse).Edge();
            BRepLib::BuildCurve3d(aTopHelixEdge);
        }

        TopoDS_Shape aHelixCutter;
        if (End_Type == End_Types::Open_Ground || End_Type == End_Types::Closed_Ground) {
            // Create Bottom Cutter Box
            std::cout << "Create Bottom Cutter Box" << std::endl;
            BRepPrimAPI_MakeBox aBottomHelixBox(aCutterWidth, aCutterWidth, aClosedHelixPitch);
            const TopoDS_Shape& aBottomHelixCutter = aBottomHelixBox.Shape();
            gp_Trsf aBottomTrsf;
            aBottomTrsf.SetTranslation(gp_Vec(-aCutterWidth/2.0, -aCutterWidth/2.0, -aClosedHelixPitch));
            TopoDS_Shape aBottomHelixCutterTransformed = BRepBuilderAPI_Transform(aBottomHelixCutter, aBottomTrsf);

            // Create Top Cutter Box
            std::cout << "Create Top Cutter Box" << std::endl;
            BRepPrimAPI_MakeBox aTopHelixBox(aCutterWidth, aCutterWidth, aClosedHelixPitch);
            const TopoDS_Shape& aTopHelixCutter = aBottomHelixBox.Shape();
            gp_Trsf aTopTrsf;
            aTopTrsf.SetTranslation(gp_Vec(-aCutterWidth/2.0, -aCutterWidth/2.0, aCutterHeight));
            TopoDS_Shape aTopHelixCutterTransformed = BRepBuilderAPI_Transform(aTopHelixCutter, aTopTrsf);

            // Fuse Bottom and Top Cutter Boxes
            aHelixCutter = BRepAlgoAPI_Fuse(aBottomHelixCutterTransformed, aTopHelixCutterTransformed);
        }

        // Create Center Helix
        Standard_Real aCenterHelixZ = 0.0;
        if (End_Type == End_Types::Closed || End_Type == End_Types::Closed_Ground) {
            std::cout << "Create Center Helix at Closed Height" << std::endl;
            aCenterHelixZ = aClosedHelixHeight;
        } else {
            std::cout << "Create Center Helix at 0.0" << std::endl;
            aCenterHelixZ = 0.0;
        }
        gp_Ax2 aCenterHelixOrigin(gp_Pnt(0.0, 0.0, aCenterHelixZ), gp_Dir(0.0, 0.0, 1.0));
        Handle(Geom_CylindricalSurface) aCenterHelixCylinder = new Geom_CylindricalSurface(aCenterHelixOrigin, aHelixRadius);
        gp_Lin2d aCenterHelixLine2d(gp_Pnt2d(0.0, 0.0), gp_Dir2d(2. * M_PI, aCenterHelixPitch));
        Handle(Geom2d_TrimmedCurve) aCenterHelixSegment = GCE2d_MakeSegment(aCenterHelixLine2d, 0.0, 2.0 * M_PI).Value();
        TopoDS_Edge aCenterHelixEdge = BRepBuilderAPI_MakeEdge(aCenterHelixSegment, aCenterHelixCylinder, 0.0, aCenterHelixCoils * aCenterHelixHypotenuse).Edge();
        BRepLib::BuildCurve3d(aCenterHelixEdge);

        // Create Helix Wire and Helix Pipe
        TopoDS_Wire aHelixWire;
        if (End_Type == End_Types::Closed || End_Type == End_Types::Closed_Ground) {
            std::cout << "Create Helix Wire and Pipe from Bottom, Center and Top Helix" << std::endl;
            aHelixWire = BRepBuilderAPI_MakeWire(aBottomHelixEdge,aCenterHelixEdge,aTopHelixEdge).Wire();
        } else {
            std::cout << "Create Helix Wire and Pipe from Center Helix" << std::endl;
            aHelixWire = BRepBuilderAPI_MakeWire(aCenterHelixEdge).Wire();
        }
        BRepOffsetAPI_MakePipe aHelixPipe(aHelixWire, aProfileFace);

        TopoDS_Shape aCompressionSpring;
        if (End_Type == End_Types::Open_Ground || End_Type == End_Types::Closed_Ground) {
            // Cut Bottom and Top Cutter Boxes from Total Helix Pipe
            std::cout << "Create Compression Spring from Helix Pipe minus Cutters" << std::endl;
            aCompressionSpring = BRepAlgoAPI_Cut(aHelixPipe, aHelixCutter);
        } else {
            std::cout << "Create Compression Spring from Helix Pipe" << std::endl;
            aCompressionSpring = aHelixPipe;
        }

        // Mesh Compression Spring
        std::cout << "Mesh Compression Spring" << std::endl;
        BRepMesh_IncrementalMesh mesh(aCompressionSpring, LinearDeflection );
        mesh.Perform();

        // Generate STL File
        std::cout << "Generate STL File" << std::endl;
        StlAPI_Writer writer;
        int result;
        result = writer.Write(aCompressionSpring, "OCCSample.stl");
        std::cout << "result=" << (result==true ? "success" : "fail") << std::endl;
        
    } catch(int &err) {
        std::cout << "err=" << err << std::endl;
    }

    std::cout << "Ending OCCSample" << std::endl;
    return 0;
}
