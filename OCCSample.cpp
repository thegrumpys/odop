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
#include <BRepOffsetAPI_MakePipeShell.hxx>
#include <BRepPrimAPI_MakeBox.hxx>
#include <BRepPrimAPI_MakePrism.hxx>
#include <BRepTools.hxx>
#include <ElCLib.hxx>
#include <GCE2d_MakeLine.hxx>
#include <GCE2d_MakeArcOfCircle.hxx>
#include <GC_MakeCircle.hxx>
#include <Geom2d_Circle.hxx>
#include <Geom2d_Line.hxx>
#include <Geom_CylindricalSurface.hxx>
#include <IntAna2d_AnaIntersection.hxx>
#include <StlAPI_Writer.hxx>
#include <TopExp.hxx>
#include <TopoDS_Edge.hxx>
#include <TopoDS_Face.hxx>
#include <TopoDS_Shape.hxx>
#include <gce_ErrorType.hxx>
#include <gce_MakeCirc2d.hxx>
#include <gce_MakeLin2d.hxx>
#include <gp_Circ.hxx>
#include <gp_Circ2d.hxx>
#include <gp_Pnt.hxx>
#include <gp_Pnt2d.hxx>
#include <gp_Vec2d.hxx>
#include <gp_Trsf.hxx>
#include <iostream>

using namespace std;

Handle(Geom2d_TrimmedCurve) MakeArcOfCircle(const gp_Pnt2d& P1 ,
                     const gp_Vec2d& V  ,
                     const gp_Pnt2d& P2 )
{
    Standard_Boolean Sense;
    gp_Circ2d cir;
    gp_Lin2d corde = gce_MakeLin2d(P1,P2);
    gp_Dir2d dir(corde.Direction());
    gp_Lin2d bis(gp_Pnt2d((P1.X()+P2.X())/2.,(P1.Y()+P2.Y())/2.),
                 gp_Dir2d(-dir.Y(),dir.X()));
    gp_Lin2d norm(P1,gp_Dir2d(-V.Y(),V.X()));
    gce_ErrorType TheError = gce_ConfusedPoints;
    
    IntAna2d_AnaIntersection Intp(bis,norm);
    
    if (Intp.IsDone())
    {
        if (!Intp.IsEmpty())
        {
            gp_Pnt2d center(Intp.Point(1).Value());
            Standard_Real rad = (center.Distance(P1)+center.Distance(P2))/2.;
            cir = gce_MakeCirc2d(center,rad);
            TheError = gce_Done;
        }
    }
    
    if (TheError == gce_Done) {
        Standard_Real Alpha1 = ElCLib::Parameter(cir,P1);
        Standard_Real Alpha2 = ElCLib::Parameter(cir,P2);
        Handle(Geom2d_Circle) Circ = new Geom2d_Circle(cir);
        gp_Vec2d vv(dir);
        Standard_Real cross = V^vv;
        Sense = cross > 0.;
        Handle(Geom2d_TrimmedCurve) TheArc= new Geom2d_TrimmedCurve(Circ,Alpha1,Alpha2,Sense);
        return TheArc;
    }
    return NULL;
}

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
        Standard_Real Coils_T = 5.0;
        Standard_Real Mean_Dia = 0.9945;
        Standard_Real Coils_A = 1.0;
        Standard_Integer End_Type = End_Types::Closed;
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

        Standard_Real profileRadius = Wire_Dia / 2.0 * in2mm;
        std::cout << "profileRadius=" << profileRadius << std::endl;

        Standard_Real helixRadius = Mean_Dia / 2.0 * in2mm;
        std::cout << "helixRadius=" << helixRadius << std::endl;

        Standard_Real closedHelixCoils = (Coils_T - Coils_A) / 2.0;
        Standard_Real closedHelixPitch = Wire_Dia * in2mm;
        Standard_Real closedHelixHypotenuse = sqrt((2.0 * M_PI * 2.0 * M_PI) + (closedHelixPitch * closedHelixPitch));
        Standard_Real closedTransitionCoils = 0.0;
        if (Coils_T - Coils_A > 0.0) {
            closedTransitionCoils = 0.250;
            closedHelixCoils -= closedTransitionCoils;
        }
        Standard_Real closedHelixHeight = closedHelixCoils * closedHelixPitch;
        Standard_Real closedTransitionHypotenuse = closedTransitionCoils * closedHelixHypotenuse;
        Standard_Real closedTransitionHeight = closedTransitionCoils * closedHelixPitch;
        std::cout << "closedHelixCoils=" << closedHelixCoils << std::endl;
        std::cout << "closedHelixPitch=" << closedHelixPitch << std::endl;
        std::cout << "closedHelixHypotenuse=" << closedHelixHypotenuse << std::endl;
        std::cout << "closedHelixHeight=" << closedHelixHeight << std::endl;
        std::cout << "closedTransitionCoils=" << closedTransitionCoils << std::endl;
        std::cout << "closedTransitionHypotenuse=" << closedTransitionHypotenuse << std::endl;
        std::cout << "closedTransitionHeight=" << closedTransitionHeight << std::endl;

        Standard_Real cutterWidth = OD_Free * in2mm;
        Standard_Real cutterHeight = L_Free * in2mm;
        std::cout << "cutterWidth=" << cutterWidth << std::endl;
        std::cout << "cutterHeight=" << cutterHeight << std::endl;

        Standard_Real centerHelixCoils = Coils_A;
        Standard_Real centerHelixPitch = (L_Free - Wire_Dia * (Coils_T - Coils_A)) / Coils_A * in2mm;
        Standard_Real centerHelixHypotenuse = sqrt((2.0 * M_PI * 2.0 * M_PI) + (centerHelixPitch * centerHelixPitch));
        Standard_Real centerTransitionCoils = closedTransitionHypotenuse / centerHelixHypotenuse * centerHelixCoils;
        if (Coils_T - Coils_A > 0.0) {
            centerHelixCoils -= 2.0 * centerTransitionCoils;
        }
        Standard_Real centerHelixHeight = centerHelixCoils * centerHelixPitch;
        Standard_Real centerTransitionHypotenuse = closedTransitionHypotenuse; // They must match
        Standard_Real centerTransitionHeight = closedTransitionHypotenuse / centerHelixHypotenuse * centerHelixPitch;
        std::cout << "centerHelixCoils=" << centerHelixCoils << std::endl;
        std::cout << "centerHelixPitch=" << centerHelixPitch << std::endl;
        std::cout << "centerHelixHypotenuse=" << centerHelixHypotenuse << std::endl;
        std::cout << "centerHelixHeight=" << centerHelixHeight << std::endl;
        std::cout << "centerTransitionCoils=" << centerTransitionCoils << std::endl;
        std::cout << "centerTransitionHypotenuse=" << centerTransitionHypotenuse << std::endl;
        std::cout << "centerTransitionHeight=" << centerTransitionHeight << std::endl;
        std::cout << std::endl;

        // Profile Face
        std::cout << "Profile Face" << std::endl;
        gp_Ax2 anAxis;
        anAxis.SetDirection(gp_Dir(0.0, -2. * M_PI, -closedHelixPitch));
        anAxis.SetLocation(gp_Pnt(helixRadius, 0.0, 0.0));
        gp_Circ profileCircle(anAxis, profileRadius);
        TopoDS_Edge profileEdge = BRepBuilderAPI_MakeEdge(profileCircle).Edge();
        TopoDS_Wire profileWire = BRepBuilderAPI_MakeWire(profileEdge).Wire();
        TopoDS_Face profileFace = BRepBuilderAPI_MakeFace(profileWire).Face();

        TopoDS_Edge bottomHelixEdge;
        TopoDS_Edge bottomTransitionEdge;
        TopoDS_Edge topHelixEdge;
        TopoDS_Edge topTransitionEdge;
        if (End_Type == End_Types::Closed || End_Type == End_Types::Closed_Ground) {
            // Create Bottom Helix
            std::cout << "Create Bottom Helix" << std::endl;
            Handle(Geom2d_Line) bottomHelixLine = GCE2d_MakeLine(gp_Pnt2d(0.0, 0.0), gp_Dir2d(2. * M_PI, closedHelixPitch));
            gp_Ax2 bottomHelixOrigin(gp_Pnt(0.0, 0.0, 0.0), gp_Dir(0.0, 0.0, 1.0));
            Handle(Geom_CylindricalSurface) bottomHelixCylinder = new Geom_CylindricalSurface(bottomHelixOrigin, helixRadius);
            bottomHelixEdge = BRepBuilderAPI_MakeEdge(bottomHelixLine, bottomHelixCylinder, 0.0, closedHelixCoils * closedHelixHypotenuse).Edge();
            std::cout << "bottomHelixEdge="; BRepTools::Dump(bottomHelixEdge, std::cout); std::cout << std::endl; // @@@ DUMP @@@
            BRepLib::BuildCurve3d(bottomHelixEdge);

            // Create Bottom Transition
            std::cout << "Create Bottom Transition" << std::endl;
            Handle(Geom2d_TrimmedCurve) bottomTransitionLine = MakeArcOfCircle(gp_Pnt2d(0.0, 0.0), gp_Vec2d(gp_Dir2d(2. * M_PI, closedHelixPitch)), gp_Pnt2d(closedTransitionCoils * 2.0 * M_PI + centerTransitionCoils * 2.0 * M_PI, closedTransitionCoils * closedHelixPitch + centerTransitionCoils * centerHelixPitch));
            gp_Ax2 bottomTransitionOrigin(gp_Pnt(0.0, 0.0, closedHelixHeight), gp_Dir(0.0, 0.0, 1.0));
            Handle(Geom_CylindricalSurface) bottomTransitionCylinder = new Geom_CylindricalSurface(bottomTransitionOrigin, helixRadius);
            gp_Trsf bottomTransitionTrsf;
            bottomTransitionTrsf.SetRotation(gp_Ax1(), -closedTransitionCoils * 2.0 * M_PI);
            bottomTransitionCylinder->Transform(bottomTransitionTrsf);
            bottomTransitionEdge = BRepBuilderAPI_MakeEdge(bottomTransitionLine, bottomTransitionCylinder).Edge();
            std::cout << "bottomTransitionEdge="; BRepTools::Dump(bottomTransitionEdge, std::cout); // @@@ DUMP @@@
            BRepLib::BuildCurve3d(bottomTransitionEdge); std::cout << std::endl;

//            // Create Top Transition
//            std::cout << "Create Top Transition" << std::endl;
//            GCE2d_MakeArcOfCircle (const gp_Pnt2d &P1, const gp_Vec2d &V, const gp_Pnt2d &P2)
//
//            // Create Top Helix
//            std::cout << "Create Top Helix" << std::endl;
//            Handle(Geom2d_Line) topHelixLine = GCE2d_MakeLine(gp_Pnt2d(0.0, 0.0), gp_Dir2d(2. * M_PI, closedHelixPitch));
//            gp_Ax2 topHelixOrigin(gp_Pnt(0.0, 0.0, closedHelixHeight+centerHelixHeight), gp_Dir(0.0, 0.0, 1.0));
//            Handle(Geom_CylindricalSurface) topHelixCylinder = new Geom_CylindricalSurface(topHelixOrigin, helixRadius);
//            topHelixEdge = BRepBuilderAPI_MakeEdge(topHelixLine, topHelixCylinder, 0.0, (closedHelixCoils - closedTransitionCoils) * closedHelixHypotenuse).Edge();
//            BRepLib::BuildCurve3d(topHelixEdge);
        }

        TopoDS_Shape helixCutter;
        if (End_Type == End_Types::Open_Ground || End_Type == End_Types::Closed_Ground) {
            // Create Bottom Cutter Box
            std::cout << "Create Bottom Cutter Box" << std::endl;
            BRepPrimAPI_MakeBox bottomHelixBox(cutterWidth, cutterWidth, closedHelixPitch);
            const TopoDS_Shape& bottomHelixCutter = bottomHelixBox.Shape();
            gp_Trsf bottomTrsf;
            bottomTrsf.SetTranslation(gp_Vec(-cutterWidth/2.0, -cutterWidth/2.0, -closedHelixPitch));
            TopoDS_Shape bottomHelixCutterTransformed = BRepBuilderAPI_Transform(bottomHelixCutter, bottomTrsf);

            // Create Top Cutter Box
            std::cout << "Create Top Cutter Box" << std::endl;
            BRepPrimAPI_MakeBox topHelixBox(cutterWidth, cutterWidth, closedHelixPitch);
            const TopoDS_Shape& topHelixCutter = bottomHelixBox.Shape();
            gp_Trsf topTrsf;
            topTrsf.SetTranslation(gp_Vec(-cutterWidth/2.0, -cutterWidth/2.0, cutterHeight));
            TopoDS_Shape topHelixCutterTransformed = BRepBuilderAPI_Transform(topHelixCutter, topTrsf);

            // Fuse Bottom and Top Cutter Boxes
            helixCutter = BRepAlgoAPI_Fuse(bottomHelixCutterTransformed, topHelixCutterTransformed);
        }

        // Create Center Helix
        Standard_Real centerHelixZ;
        if (End_Type == End_Types::Closed || End_Type == End_Types::Closed_Ground) {
            std::cout << "Create Center Helix at Closed Height" << std::endl;
            centerHelixZ = closedHelixHeight+closedTransitionHeight+centerTransitionHeight;
        } else {
            std::cout << "Create Center Helix at 0.0" << std::endl;
            centerHelixZ = 0.0;
        }
        Handle(Geom2d_Line) centerHelixSegment = GCE2d_MakeLine(gp_Pnt2d(0.0, 0.0), gp_Dir2d(2. * M_PI, centerHelixPitch));
        gp_Ax2 centerHelixOrigin(gp_Pnt(0.0, 0.0, centerHelixZ), gp_Dir(0.0, 0.0, 1.0));
        Handle(Geom_CylindricalSurface) centerHelixCylinder = new Geom_CylindricalSurface(centerHelixOrigin, helixRadius);
        gp_Trsf centerTransitionTrsf;
        centerTransitionTrsf.SetRotation(gp_Ax1(), centerTransitionCoils * 2.0 * M_PI);
        centerHelixCylinder->Transform(centerTransitionTrsf);
        TopoDS_Edge centerHelixEdge = BRepBuilderAPI_MakeEdge(centerHelixSegment, centerHelixCylinder, 0.0, centerHelixCoils * centerHelixHypotenuse).Edge();
        std::cout << "centerHelixEdge="; BRepTools::Dump(centerHelixEdge, std::cout); // @@@ DUMP @@@
        BRepLib::BuildCurve3d(centerHelixEdge);

        // Create Helix Wire and Helix Pipe
        TopoDS_Wire helixWire;
        if (End_Type == End_Types::Closed || End_Type == End_Types::Closed_Ground) {
            std::cout << "Create Helix Wire and Pipe from Bottom, Center and Top Helix" << std::endl;
//            helixWire = BRepBuilderAPI_MakeWire(bottomHelixEdge, bottomTransitionEdge, centerHelixEdge, topTransitionEdge, topHelixEdge).Wire();
            helixWire = BRepBuilderAPI_MakeWire(bottomHelixEdge, bottomTransitionEdge, centerHelixEdge).Wire();
//            helixWire = BRepBuilderAPI_MakeWire(bottomHelixEdge, bottomTransitionEdge).Wire();
//            helixWire = BRepBuilderAPI_MakeWire(bottomHelixEdge).Wire();
//            helixWire = BRepBuilderAPI_MakeWire(bottomTransitionEdge).Wire();
//            helixWire = BRepBuilderAPI_MakeWire(centerHelixEdge).Wire();
//            helixWire = BRepBuilderAPI_MakeWire(bottomHelixEdge, centerHelixEdge).Wire();
        } else {
            std::cout << "Create Helix Wire and Pipe from Center Helix" << std::endl;
            helixWire = BRepBuilderAPI_MakeWire(centerHelixEdge).Wire();
        }
        BRepOffsetAPI_MakePipeShell helixPipe(helixWire);
        helixPipe.SetTransitionMode(BRepBuilderAPI_RoundCorner);
        helixPipe.Add(profileWire, Standard_False, Standard_True);
        helixPipe.Build();
        Standard_Boolean flag = helixPipe.MakeSolid();
        std::cout << "flag=" << (flag==true ? "success" : "fail") << std::endl;

        TopoDS_Shape compressionSpring;
        if (End_Type == End_Types::Open_Ground || End_Type == End_Types::Closed_Ground) {
            // Cut Bottom and Top Cutter Boxes from Total Helix Pipe
            std::cout << "Create Compression Spring from Helix Pipe minus Cutters" << std::endl;
            compressionSpring = BRepAlgoAPI_Cut(helixPipe, helixCutter);
        } else {
            std::cout << "Create Compression Spring from Helix Pipe" << std::endl;
            compressionSpring = helixPipe;
        }

        // Mesh Compression Spring
        std::cout << "Mesh Compression Spring" << std::endl;
        BRepMesh_IncrementalMesh mesh(compressionSpring, LinearDeflection, Standard_False, 0.5, Standard_False );
        Standard_Integer status = mesh.GetStatusFlags();
        std::cout << "status=" << status << std::endl;

        // Generate BREP File
        std::cout << "Generate BREP File" << std::endl;
        Standard_Boolean brep_result;
        brep_result = BRepTools::Write(compressionSpring, "compressionSpring.brep", Standard_False, Standard_False, TopTools_FormatVersion_VERSION_1);
        std::cout << "brep_result=" << (brep_result==true ? "success" : "fail") << std::endl;

        // Generate STL File
        std::cout << "Generate STL File" << std::endl;
        StlAPI_Writer writer;
        Standard_Boolean result;
        result = writer.Write(compressionSpring, "compressionSpring.stl");
        std::cout << "result=" << (result==true ? "success" : "fail") << std::endl;
        
    } catch(Standard_Failure &err) {
        std::cout << "Standard_Failure &err=" << err << std::endl;
    } catch(int &err) {
        std::cout << "int &err=" << err << std::endl;
    }

    std::cout << "Ending OCCSample" << std::endl;
    return 0;
}
