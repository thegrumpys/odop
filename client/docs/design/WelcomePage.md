# Welcome Page ideas

For the purpose of this discussion, a "welcome page" is a hypothetical web page or modal dialog box 
that appears after a visitor to SpringDesignSoftware.org clicks on the "Launch Software" button and before the Okta sign-in widget.

Early experience coming out of the Google Ads campaign suggests that a fair number of users
click on one of the website's "Launch Software" buttons and view the
Sign-in Widget but do not proceed further. 
It is hoped that a welcome page might address some of this reluctance to continue with 
a more detailed evaluation of the software.

Considering that returning users might consider repeated views of such a welcome page to be an unneccesary burden, 
it may be possible to eliminate showing this page to users that have already seen it.
For example, a cookie might be placed in the browser of users at the time that the page is initially displayed.
Future display of the page could be suppressed for users with the cookie. 
Similarily, IP addresses in the log_usage table might be used to identify returning users.

Points that a welcome page might attempt to communicate:
  - Welcome !
  - Yes, the software really is free.  Links to explanation of the open-source model.
  - No, there is no "catch".  No advertising support.  If you give us an email address we won't sell your info or send spam. Link to privacy policy.
  - The authors of ODOP and SpringDesignSoftware.org are not affiliated with any spring manufacturer or other participant in the spring industry.   
    The free availability of the software is not any kind of "lead generation" activity. 
  - You can evaluate with username and password = "public". Link to userAccounts.
  - We want your feedback.  We offer an over-the-phone walkthrough & help with first spring design.  Link to ContactUs.
  - Create an account by clicking "Sign-up" in the lower right of the Sign-in page. 
  - Other ?   


**Discussion**  

Would a YouTube video be a more effective approach with this material ?

If such a feature were to be implemented, it would probably be better (easier, more flexible, more maintainable) to do it on the website versus in the ODOP code.   

Currently, there are at least five "Launch Software" places on the website.
The website getting-started page or perhaps the website About page are likely the best place to communicate this kind of material.   

There is some concern that Heroku's 20 second delay in starting its "dyno" is a possible source of the abandonment behavior described above. 
Is it time to move beyond the Heroku free account ?   

Are there other ways such as a monitoring service to keep the Heroku dyno active ? 
See: [Pingdom](https://www.pingdom.com/), [New Relic](https://newrelic.com/) and [CULA](https://cula.io). 
If it were possible to have Google Analytics present the exact time (to the second) that a "Launch Software" button was pushed (gtag event?),
it might be possible to compare that time with the time of index.html of the ODOP app on Heroku
in order to better understand the relationship between abandoned sessions and dyno start delays.

