import interactiveTutorials from 'react-interactive-tutorials'
import {
  paragraphs,
  registerTutorials,
} from 'react-interactive-tutorials'

export const TUTORIALS = {
  'demo': {
    key: 'demo',
    title: 'Demo',
    steps: [
      {
        key: 'start',
        announce: paragraphs`
            The following example briefly illustrates the use of SpringSys to check
            the design of a compression spring.  This example also appears in the
            appendix to the SpringSys User's Manual.
    
            Refer to the session named LONGDEMO for a more detailed example of design
            from original specifications.  DEMO6, DEMO7 and DEMO8 present examples of
            extension spring design.  Refer to the User's Manual and the various
            tutorial sessions, TUTOR1, TUTOR2, ...  TUTOR9 for detailed instructions
            on how to use SpringSys.
    
            To continue with this example, just strike the "Enter" key as you finish
            reading each frame.  This key corresponds to the "carriage return" key
            of a typewriter and may be marked with a down and left arrow that looks
            like:   <--'
        `,
        announceDismiss: "Next",
        activeWhen: [],
      }
    ],
    complete: {
      on: 'checkpointReached',
      checkpoint: 'complete',
      title: 'Demo Complete!',
      message: 'That concludes the demo.',
    },
  },
};

registerTutorials(TUTORIALS);
