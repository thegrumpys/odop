## Proposed names for quantities previously called "constants"

The CLI system currently uses the term "constants" in a way that is not consistent with people's expectations for that word. 
Specifically, the quantities contained in the D, DI and DS arrays are not truly constant. 
Similarly, while the CONTNT procedure / function is used to initialize these not-so-constant quantities, 
it also is used in other ways and thus the name is misleading.

Instead of using the term "constants", other possibilities include:
 * static terms
 * static variables
 * static quantities
 * problem quantities
 * calculation inputs
 * unconstrained variables
 * other variables
 * other terms
 
 Per discussion, the best approach may be to adopt an inheritance model where both the
 old "constants" and design parameters are a proper subset of a broader class such as "Independent Variables".   
 Possibilities include: 

Independent Variables
 * Searchable Independent Variables      (previously Design Parameters)
 * Non-Searchable Independent Variables  (previously Constants)

Independent Variables
 * Design Parameters
 * Calculation Variables  (previously Constants)

Independent Variables
 * Design Parameters
 * Calculation Inputs  (previously Constants)   


Instead of naming the procedure / function CONTNT, it could be named:
 * problem_init
 * designProblemInit
 * designProblemInit  (with embedded underscores)
 * desProbInit
 * designTypeInit
 
  