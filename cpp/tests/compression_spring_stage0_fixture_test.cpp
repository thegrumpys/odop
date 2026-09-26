#include "odop/compression_spring_model.hpp"

#include <cmath>
#include <cstdlib>
#include <fstream>
#include <iostream>
#include <limits>
#include <regex>
#include <sstream>
#include <string>
#include <vector>

namespace {
std::string read_fixture() {
  std::ifstream input(ODOP_STAGE0_FIXTURE_PATH);
  std::ostringstream output;
  output << input.rdbuf();
  return output.str();
}

std::string case_body(const std::string& fixture, const std::string& id) {
  const auto start = fixture.find("\"id\": \"" + id + "\"");
  const auto next = fixture.find("\"id\":", start + 1);
  return fixture.substr(start, next == std::string::npos ? std::string::npos : next - start);
}

std::string array_body(const std::string& body, const std::string& key) {
  const auto start = body.find("\"" + key + "\": [");
  const auto end = body.find(']', start);
  return body.substr(start + key.size() + 5, end - (start + key.size() + 5));
}

std::vector<double> numbers(const std::string& body) {
  std::vector<double> result;
  std::istringstream input(body);
  std::string value;
  while (std::getline(input, value, ',')) {
    if (value.find('"') != std::string::npos) break;
    result.push_back(std::stod(value));
  }
  return result;
}

std::vector<double> x_before() {
  return {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,1,2,0,0,0,1,.284,11500000,1,261419.22328169446,50,50,
    130709.61164084723,130709.61164084723,4,2,0,0,0,.01,.4,-2,
    -106113.37959890341,370000};
}

bool close(const double actual, const double expected) {
  return std::abs(actual - expected) <= 1.e-10 + 1.e-12 * std::abs(expected);
}

bool matches(const double actual, const std::string& expected) {
  if (expected == "\"NaN\"") return std::isnan(actual);
  if (expected == "\"Infinity\"") return std::isinf(actual) && !std::signbit(actual);
  return close(actual, std::stod(expected));
}

bool expect_offsets(const std::string& body, const std::vector<double>& x) {
  const auto map = body.find("\"expectAtOffsets\": {");
  if (map == std::string::npos) return false;
  const auto end = body.find('}', map);
  const std::regex entry(R"json("([0-9]+)"\s*:\s*("(?:NaN|Infinity)"|[-+0-9.eE]+))json");
  const std::string values = body.substr(map, end - map + 1);
  for (std::sregex_iterator it(values.begin(), values.end(), entry), last;
       it != last; ++it) {
    const auto offset = static_cast<std::size_t>(std::stoul((*it)[1].str()));
    if (!matches(x.at(offset), (*it)[2].str())) return false;
  }
  return true;
}
}

int main() {
  try {
  const auto fixture = read_fixture();
  if (fixture.empty()) return EXIT_FAILURE;
  const auto normal = case_body(fixture, "us-material-table-normal");
  auto p = numbers(array_body(normal, "p"));
  auto x = x_before();
  odop::compression_spring::evaluate(p, x, "mat_us.json", odop::SystemControls{});
  const auto expected = numbers(array_body(normal, "xAfter"));
  if (expected.size() != 23) return EXIT_FAILURE;
  for (std::size_t i = 0; i < expected.size(); ++i) if (!close(x[i], expected[i])) return EXIT_FAILURE;

  for (const std::string id : {"spring-index-one", "zero-active-coils", "zero-mean-diameter"}) {
    const auto test_case = case_body(fixture, id);
    p = numbers(array_body(test_case, "p"));
    x = x_before();
    odop::compression_spring::evaluate(p, x, "mat_us.json", odop::SystemControls{});
    if (!expect_offsets(test_case, x)) return EXIT_FAILURE;
  }
  return EXIT_SUCCESS;
  } catch (const std::exception& error) {
    std::cerr << error.what() << '\n';
    return EXIT_FAILURE;
  }
}
