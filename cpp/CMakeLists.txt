cmake_minimum_required(VERSION 3.20)

project(odop_computational_engine LANGUAGES CXX)

option(ODOP_BUILD_NATIVE_TESTS "Build native computational-engine smoke tests" ON)
option(ODOP_BUILD_WASM "Build the Emscripten smoke module" OFF)

add_library(odop-core STATIC
  core/src/design_session.cpp
  core/src/piston_cylinder.cpp
  core/src/compression_spring_state.cpp
  models/compression_spring/src/compression_spring_model.cpp
)
add_library(odop::core ALIAS odop-core)

target_compile_features(odop-core PUBLIC cxx_std_20)
target_include_directories(odop-core
  PUBLIC
    $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/core/include>
    $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/models/compression_spring/include>
)

if(ODOP_BUILD_NATIVE_TESTS AND NOT ODOP_BUILD_WASM)
  enable_testing()

  add_executable(odop-core-smoke-test
    tests/piston_cylinder_test.cpp
  )
  target_link_libraries(odop-core-smoke-test PRIVATE odop::core)
  add_test(NAME odop-core-smoke-test COMMAND odop-core-smoke-test)

  add_executable(odop-compression-spring-state-test
    tests/compression_spring_state_test.cpp
  )
  target_link_libraries(odop-compression-spring-state-test PRIVATE odop::core)
  add_test(NAME odop-compression-spring-state-test COMMAND odop-compression-spring-state-test)
endif()

if(ODOP_BUILD_WASM)
  if(NOT EMSCRIPTEN)
    message(FATAL_ERROR "ODOP_BUILD_WASM requires Emscripten; configure with emcmake.")
  endif()

  add_executable(odop_wasm wasm/src/piston_cylinder_bindings.cpp)
  target_link_libraries(odop_wasm PRIVATE odop::core)
  target_compile_features(odop_wasm PRIVATE cxx_std_20)
  target_link_options(odop_wasm PRIVATE
    "-sMODULARIZE=1"
    "-sEXPORT_ES6=1"
    "-sENVIRONMENT=node"
    "-sEXPORTED_FUNCTIONS=['_malloc','_free','_odop_piston_cylinder_evaluate']"
  )
  set_target_properties(odop_wasm PROPERTIES SUFFIX ".mjs")
endif()
