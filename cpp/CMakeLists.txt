cmake_minimum_required(VERSION 3.20)

project(odop_computational_engine LANGUAGES CXX)

option(ODOP_BUILD_NATIVE_TESTS "Build native computational-engine smoke tests" ON)
option(ODOP_BUILD_WASM "Build the Emscripten smoke module" OFF)

add_library(odop-core STATIC
  core/src/design_session.cpp
  core/src/optimization.cpp
  core/src/piston_cylinder.cpp
  core/src/compression_spring_state.cpp
  models/compression_spring/src/compression_spring_model.cpp
  models/compression_spring/src/compression_spring_resources.cpp
  models/compression_spring/src/compression_spring_init.cpp
  models/compression_spring/src/compression_spring_eqnset.cpp
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

  add_executable(odop-compression-spring-eqnset-test
    tests/compression_spring_eqnset_test.cpp
  )
  target_link_libraries(odop-compression-spring-eqnset-test PRIVATE odop::core)
  add_test(NAME odop-compression-spring-eqnset-test COMMAND odop-compression-spring-eqnset-test)

  add_executable(odop-compression-spring-stage0-fixture-test
    tests/compression_spring_stage0_fixture_test.cpp
  )
  target_link_libraries(odop-compression-spring-stage0-fixture-test PRIVATE odop::core)
  target_compile_definitions(odop-compression-spring-stage0-fixture-test PRIVATE
    ODOP_STAGE0_FIXTURE_PATH="${CMAKE_CURRENT_SOURCE_DIR}/../docs/Architecture/fixtures/compression-spring/stage0/eqnset.json"
  )
  add_test(NAME odop-compression-spring-stage0-fixture-test COMMAND odop-compression-spring-stage0-fixture-test)

  add_executable(odop-objective-test tests/objective_test.cpp)
  target_link_libraries(odop-objective-test PRIVATE odop::core)
  add_test(NAME odop-objective-test COMMAND odop-objective-test)

  add_executable(odop-search-test tests/search_test.cpp)
  target_link_libraries(odop-search-test PRIVATE odop::core)
  add_test(NAME odop-search-test COMMAND odop-search-test)
endif()

if(ODOP_BUILD_WASM)
  if(NOT EMSCRIPTEN)
    message(FATAL_ERROR "ODOP_BUILD_WASM requires Emscripten; configure with emcmake.")
  endif()

  add_executable(odop_wasm wasm/src/piston_cylinder_bindings.cpp wasm/src/compression_spring_bindings.cpp)
  target_link_libraries(odop_wasm PRIVATE odop::core)
  target_compile_features(odop_wasm PRIVATE cxx_std_20)
  target_link_options(odop_wasm PRIVATE
    "-sMODULARIZE=1"
    "-sEXPORT_ES6=1"
    "-sENVIRONMENT=node"
    "-sEXPORTED_RUNTIME_METHODS=['cwrap']"
    "-sEXPORTED_FUNCTIONS=['_malloc','_free','_odop_piston_cylinder_evaluate','_odop_compression_spring_evaluate','_odop_compression_spring_session_create','_odop_compression_spring_session_destroy','_odop_compression_spring_session_clear','_odop_compression_spring_session_set_numeric','_odop_compression_spring_session_set_text','_odop_compression_spring_session_set_propagation','_odop_compression_spring_session_set_control','_odop_compression_spring_session_recalculate','_odop_compression_spring_session_search','_odop_compression_spring_session_get_numeric','_odop_compression_spring_session_diagnostic','_odop_compression_spring_session_get_text','_odop_compression_spring_session_objective']"
  )
  set_target_properties(odop_wasm PROPERTIES SUFFIX ".mjs")
  add_executable(odop_wasm_worker wasm/src/piston_cylinder_bindings.cpp wasm/src/compression_spring_bindings.cpp)
  target_link_libraries(odop_wasm_worker PRIVATE odop::core)
  target_compile_features(odop_wasm_worker PRIVATE cxx_std_20)
  target_link_options(odop_wasm_worker PRIVATE
    "-sMODULARIZE=1"
    "-sEXPORT_ES6=1"
    "-sENVIRONMENT=web,worker"
    "-sEXPORTED_RUNTIME_METHODS=['cwrap']"
    "-sEXPORTED_FUNCTIONS=['_malloc','_free','_odop_piston_cylinder_evaluate','_odop_compression_spring_evaluate','_odop_compression_spring_session_create','_odop_compression_spring_session_destroy','_odop_compression_spring_session_clear','_odop_compression_spring_session_set_numeric','_odop_compression_spring_session_set_text','_odop_compression_spring_session_set_propagation','_odop_compression_spring_session_set_control','_odop_compression_spring_session_recalculate','_odop_compression_spring_session_search','_odop_compression_spring_session_get_numeric','_odop_compression_spring_session_diagnostic','_odop_compression_spring_session_get_text','_odop_compression_spring_session_objective']"
  )
  set_target_properties(odop_wasm_worker PROPERTIES SUFFIX ".mjs" OUTPUT_NAME "odop_wasm" RUNTIME_OUTPUT_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}/worker")
  add_custom_command(TARGET odop_wasm_worker POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E make_directory ${CMAKE_CURRENT_SOURCE_DIR}/../client/src/computation/wasm
    COMMAND ${CMAKE_COMMAND} -E copy_if_different $<TARGET_FILE:odop_wasm_worker> ${CMAKE_CURRENT_SOURCE_DIR}/../client/src/computation/wasm/odop_wasm.mjs
    COMMAND ${CMAKE_COMMAND} -E copy_if_different ${CMAKE_CURRENT_BINARY_DIR}/worker/odop_wasm.wasm ${CMAKE_CURRENT_SOURCE_DIR}/../client/src/computation/wasm/odop_wasm.wasm
  )
endif()
