## Idea for a virtual annunciator panel

In the world of 20th century industrial automation and process control, 
it was common to encounter the term ""Annunciator Panel".  
See:
[Annunciator panel](https://en.wikipedia.org/wiki/Annunciator_panel) 

Perhaps the user interface of the ODOP software could be improved by replacing the current 
Result section with something smaller that operates more like a virtual annunciator panel.

Specifically, I visualize a wide but one or two line tall section that primarily consists of a group of 64x64 pixel icons. 
Each icon might have an active (bright) or inactive (dimmed) state.
Detailed information for each icon could be presented as a tooltip.
Perhaps the action of viewing the tooltip would revert the icon's state from its active (bright) state to its inactive (dimmed) state. 
The "feasibility" icon could have three states corresponding to the current mapping of feasibility to color.
If possible, the feasibility icon tooltip could present both the current objective function value and the value of OBJMIN.
Again, if possible, the current value of NCode, (the Termination Message) could be presented as a tooltip for an  icon.

Such an implementation might cram more information into a smaller, less cluttered and more visually attractive space 
while also providing room for future expansion.
 