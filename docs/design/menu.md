# Ideas for a web page menu structure
## July 13, 2018    -   Updated July 23, 2018

## Menu Bar:
 Current thinking has a conventional horizontal menu bar located at the top of the
page.  Five main menu items should look like:

Sys-Name | File | Action | View | Help |   
--- | --- | --- | --- | ---

---

## Menu Items:

* Sys-Name
  * Link to web site
* File
  * Open
  * Save
  * Save As   
#### ------------------
  * Recent Designs
#### ------------------
  * System Preferences
#### ------------------   
* Action
  * Search
  * Seek
  * Trade
#### ----------------
  * Select Size
  * Select Catalog
#### ----------------
  * Execute
#### ----------------
* View
  * Define Sub-Problems
  * Display Sub-Problems
  #### ----------------
  * Report
 #### ----------------
  *  Calculation Inputs
  *  Violations
* Help
  * Context Help F1
  * Help Index
  * Demo
  * Tutorial
  * About

 ---

## Menu Item Descriptions:

### Sys-Name : Web site
This menu item is a link to the public-facing web site. The linked page will open in a new
browser tab.

### File : Open
This menu item is similar to the PCyl-CLI START command.  See issue #23  for additional detail on system (main web page) initialization.

### File : Save
This menu item is similar to the PCyl-CLI Save command. It over-writes the most
recently opened design file (.DSN) or database entry.

### File : Save As
This menu item is similar to the PCyl-CLI Save command. It creates a new design file
(.DSN) or database entry.

#### -------------------------------------
### File : Recent designs
These menu entries are provided for user convenience in selecting recent designs for review or additional work.
#### -------------------------------------
### File : System Preferences
This item provides a user interface to set system-specific values, including much of what is done by the PCyl-CLI SET command.
For example, system internal variables such as IOOPT, OBJMIN, FIX_WT, etc.
Other web-specific items, for example, auto re-calc and auto-search preferences, may be included.

Web page layout control should be handled in the View menu.
#### -------------------------------------

### Action : Search
This menu item invokes the Search - directly equivalent to the PCyl-CLI Search
command. There may also be a search button on the main page. This menu item is
provided primarily to maintain consistency.

### Action : Seek
This menu item invokes Seek - directly equivalent to the PCyl-CLI Seek command.
There may also be Seek button(s) on the main page. This menu item is provided
primarily to maintain consistency.

### Action : Trade
This menu item provides a similar feature to the PCyl-CLI Trade command. One
possible implementation is to pop up a form where the user can specify a strategy
(radio buttons similar to the current 0 – 3), over-ride step size and decide to keep the
result or not.

#### -------------------------------------
### Action : Select Size
This menu item allows a table look-up for a standard size of a specific Independent
Variable. It is similar to the PCyl-CLI SELECT command.

### Action : Select Catalog
This menu item allows the selection of the "nearest" design from a catalog of
standard designs. It is similar to the PCyl-CLI SELECT CATALOG command.

#### -------------------------------------
### Action : Execute
This menu item will trigger the play-back of a previously recorded sequence. A popup
(?) can provide the user an opportunity to supply a (file?) name to specify the
sequence. Some mechanism, for example, user supplied pauses will likely be
necessary to allow the user to control the pace so as to observe what is happening.
Annotations / comments are probably necessary.
The process of creating play-back sequences (files?) is not required to be user
accessible.
If necessary, generic third party tools can be used to create and annotate play-back
recordings.
#### -------------------------------------

### View : Define Sub-Problems
This menu item provides a user interface to control "IOCLASS" for independent and
dependent variables plus "static quantities".

### View : Display Sub-Problems
This menu item allows the user to specify a group of IOCLASSes be displayed. This
frequently requested feature can allow complex design problems to be "partitioned"
into sub-problems that map to sub-systems of the real world.  Notably, selecting
(check in checkbox?) classes 2, 4 & 6 would display those variables / quantities
and suppress the display of all others.

#### -------------------------------------
### View : Report
This menu item creates a .PDF file and invokes the system .PDF utility to display it.
Both generic (Independent & Dependent variables, constraint levels & violations, etc.)
as well as problem-specific data in problem-specific formats can be included in the
report. The user can use the features of the system .PDF utility in order to save the
file into the browser's local file system.

#### -------------------------------------
### View : Calculation Inputs
A check in the checkbox will cause "calculation inputs" (previously known as
"constants") to be displayed.

### View : Violations
A check in the checkbox will cause both constraint violations and the value of the
objective function to be displayed.

### Help : Context Help F1
This menu item opens a new browser tab containing a context-specific web page
describing the current task (for example, the Trade pop-up form). Hitting the F1 key
produces the same result.

### Help : Help Index
This menu item opens a new browser tab containing the index page for the Help subsystem.
All Help topics should be reachable through links on the index page.

### Help : Demo
This menu item provides the ability to select from a list of demo sessions which play
back similarly to the Action : Execute menu item.  
The demo sessions may include solutions to textbook problems in order to illustrate that the
program closely matches published results.

### Help : Tutorial
This menu item provides the ability to select from a list of tutorial sessions which play
back similarly to the Action : Execute menu item.

### Help : About
This menu item provides software release and design model version information. It
also includes a link to the home page of publicly-facing web site (a repeat of the sys-name link).
The linked page will open in a new browser tab.

