#### Hints, Tips and Tricks

This topic covers a few points that may allow a better user experience with the ODOP software.

**Use File : Save As** and **File : Save**  
A design investigation may evolve through a sequence of preliminary or candidate designs.
As each candidate design is established, it can be marked with a **File : Properties** comment
and saved into the design library with **File : Save As**.
In particular, it may be desirable to save the current design before selecting a 
new standard size or catalog item.


**Side-by-Side comparison of designs**   
Depending on available screen size, 
it may be possible to open two browser sessions with an ODOP design session in each.
Adjustments the browser's font size or "zoom" scale may be necessary for best results.
A non-overlapping side-by-side positioning of the windows will then 
facilitate comparison of two designs.   

One of the two browser sessions can keep the current most desirable design.
The other browser session can continue forward with additional trial designs.
The side-by-side aspect of the screen layout can help quickly identify the preferred design.

**Maximizing content visible in Help**   
The on-line documentation (Help) is based on a "theme" that is responsive to the available
width of the window.
If the window is sufficiently wide, the header and trailer information appears on the left.
As the width of the window is reduced, the header and trailer information will move to top and bottom.
While somewhat counter-intuitive, a reduced width window actually allows greater width for the content. 
Several places in the ODOP Help topics have images and tables that will benefit from the greater
width.

**NaN = "Not a Number"**   
If you see "NaN" where you expect to see a number, 
it is likely because the software is dealing with a computational issue
like division by zero.
It is possible that a single calculation problem will propagate NaN into many output values.   

Report 1 of the Spring design types provides warning messages for physically unrealizable
spring designs that may be the source of NaN and other computational difficulty.
So, if you encounter NaN where you expect a numeric value, check Report 1 for additional messages.

**Browser refresh and back / forward**   
Unfortunately, using the browser "Refresh" function with a single page web app such as ODOP 
will likely result in a complete reset of the main page and potential loss of a user's work 
since the last Save operation. 
Similarly, use of the browser "Back" function followed by "Forward" will likely result in 
reset of the main page.   

Note: 
The on-line documentation pages (Help) are not subject to the same concerns about browser refresh 
and browser back / forward.   

**Off-line Operation**
Off-line operation is not currently supported. 
If a design session is in progress when network connectivity is lost, 
it is possible that operation can continue but it will not be possible to
save or open new designs until network connectivity is restored.   

**Unexpected delay when first opening the software**   
Note that loading the ODOP software the first time may take 20 seconds or longer. 
This is a technical issue related to web hosting during program development. 
A production web hosting arrangement will not have this delay.

**Responsive software design**   
Developed as a "responsive" web app, the ODOP software will change its screen layout and 
input behavior in response to the capabilities of the user's device. 
Specifically, as available screen width diminishes,
sections on the right of the main page will reposition to the bottom of the page.
This means that more vertical scrolling will be required but font sizes will remain legible,
even on a cell phone.
Note that while operation on a cell phone may be possible, 
the scrolling necessary to accommodate screen size limitations may impact productivity.
Similarly, while it is possible to use the ODOP software from a mobile device, 
establishing initial impressions with a full size monitor, keyboard and mouse is recommended.   

**Printing**   
Use the print features of the browser.
Depending on the browser and operating system, it may be possible to
"print" into a .PDF file.
The Reports of the Spring design type are formatted for printing.

**How to pronounce ODOP**   
The preferred pronunciation is the individual letters O-D-O-P, 
not a word like O-dop.

**Reporting problems with the ODOP software**   
Your feedback is greatly appreciated.
Please search for your issue and review known issues on 
[GitHub](https://github.com/thegrumpys/odop/issues).
In order to comment on an existing issue or to open a new issue, a (free) GitHub account is required.
Follow the "Sign up" link at the top right.
Open a new issue by clicking the green "New issue" button (upper right).

&nbsp;
 
[Help](./)
