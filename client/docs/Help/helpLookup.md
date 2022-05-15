# Help Lookup 

ODOP provides a full-text index of its on-line Help.   

Enter a word or phrase into the "Help lookup" text entry box at the top of the main page. 
Press the Enter key or select the magnifiying glass icon to produce a ranked list of 
on-line Help topics that contain the target word or phrase. 
If possible, each entry in the list provides a brief block of text providing a bit of context 
for how the terms are used in the Help topic. 
Select the blue topic link to open a new browser tab containing the associated on-line Help entry.

&nbsp;   

## Improving Help Lookup results 
Adding control characters to lookup terms can guide the lookup to better results. 

### Include multiple words with a + prefix 
For example: +feasibility +status +indicator   

### Exclude words with a - prefix 
For example: +feasibility +status +indicator -overview   

### Use * as a wildcard character 
For example: tors*   

### Restrict term matching to the topic title only with "title:"   
For example: title:demo   

### Restrict term matching to the topic content only with "content:"   
For example: content:demo   

### Fuzzy match by appending a tilde (~) and then a positive integer to a term 
For example: saerch~1   
Adding, removing, changing or transposing one character in the word is considered a match.   

&nbsp;

Notes:   
By default, the lookup will match words with a common stem. 
For example, the term "searching" will also match "searches". 
"Feasibility" will match "feasibile". 

Unlike with Google Search, adding quotes and using operators like AND & OR to combine terms 
will not produce the desired results. 
To lookup a phrase, put a **+** at the front of each word in the phrase.   

After opening the desired Help topic, 
use your browser's "Find ...", "Find on page" or "Find in page" feature to highlight 
the term(s) of interest. 
The result should look something like:   
![highlight](/docs/Help/img/TextHiLiteExample.png "Example of browser-based text highlighting") 

See Also: 
 - [LUNR, Search Made Simple Guide](https://lunrjs.com/guides/searching.html)   

&nbsp;
 
[Help](/docs/Help)

&nbsp;   

