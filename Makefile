INCLUDE = -I.apt/usr/include/opencascade
OCLIBS = -L.apt/usr/lib/x86_64-linux-gnu \
         -lTKernel \
         -lTKMath \
         -lTKBRep \
         -lTKGeomBase \
         -lTKG3d \
         -lTKG2d \
         -lTKTopAlgo \
         -lTKPrim \
         -lTKBO \
         -lTKFillet \
         -lTKOffset \
         -lTKMesh \
         -lTKSTL \
         -lTKOffset \
         -lTKG3d

all: OCCSample run clean

OCCSample: OCCSample.o
	g++ -o $@ OCCSample.o $(OCLIBS)

OCCSample.o: OCCSample.cpp
	g++ -c -Wall -o $@ $(INCLUDE) OCCSample.cpp

run:
	./OCCSample

clean:
	rm -f OCCSample
