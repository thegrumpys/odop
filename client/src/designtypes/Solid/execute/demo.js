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
            Not Implemented.
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
