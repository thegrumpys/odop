# Proposed names for quantities previously called "constants"

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
 
 _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
  
  Extracted from an August 22 Slack conversation:
  
I have the notion that the old "constants" (d vector) goes away.
The former d elements are appended to either p or x as appropriate.
The terminology in the user interface does not change i.e. mentions only "Independent Variables" and "Dependent Variables".
On the main page, the former elements of the d vector do not get constraint entry fields.
I need to think about checkboxes for fixed status.
Internally, we can continue to use the term "Design Parameters" to refer to the searchable, fixable and constrainable sub-set of Independent Variables
and the term "State Variables" can continue to refer to the fixable and constrainable sub-set of Dependent Variables.
I am not sure that it is absolutely necessary, but we can create new terms to refer the p and x elements that are not Design Parameters or State Variables. 
Perhaps "Restricted Independent Variables" and "Restricted Dependent Variables".
If the term "Restricted" isn't quite right, perhaps "Special" might work.

 _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ 
  


  