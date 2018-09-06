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
  
As of early September, 2018 ...

The replacement for CONTNT is named init.js.  It is called on every change to a "Calculation Input" (every keystroke).

Elements (entries, members, variables) in initialState.js get new properties:
"input": true,   
"equationset": true,   
"hidden": false   

Elements with the property "input": true are inputs to the design equations and go into the p vector. 
Fixed elements are compressed out and not operated on by Search.
Elements with the property "Input": false are output from (modified by) either init.js or eqnset.js and go into the x vector.
The d vector has been eliminated.  Those elements are now distributed between the p and x vectors.
The current implementation for the compression spring design type has essentially all of the 
former members of the d vector appearing as elements in x.
This is partially for simplicity.
Note that changes to the p vector are not saved into the state of the design. 
Thus unexpected results (stale data) can occur if elements are moved into p and they later change.
This stale data issue is not a concern for elements of x.

Elements with the property "equationset": true, are fixable and constrainable ("unrestricted" in the terminology above).
Elements with the property "equationset": false, are members of the previous d vector ("restricted" in the terminology above).

Elements with the property "hidden": true are not visible in the user interface.

**The rules** for defining elements (entries, members, variables) in initialState.js:   

Any variable on the left of an equals sign in either init.js or eqnset.js **must** be "input": false ... in the x vector.

Any variable appearing **only** on the right of an equal sign in both init.js and eqnset.js may be "input": true ... in the p vector.
Note that x variables may also appear on the right of an equals sign.
This has no relevance to their assignment as "input": false.
When in doubt, it is generally safe (safer) to assign an element as "input": false.   



  