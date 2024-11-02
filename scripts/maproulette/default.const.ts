export const defaultChallenge = {
  defaultBasemap: -1,
  defaultBasemapId: '',
  instruction:
    '{{task_markdown}}\n \n \n \n . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . ',
  difficulty: 2,
  // instruction:'',
  highPriorityRule: '{}', // they are strings in the example request copied from the website; will need to investigate how to provide data
  lowPriorityRule: '{}', // they are strings in the example request copied from the website; will need to investigate how to provide data
  mediumPriorityRule: '{}', // they are strings in the example request copied from the website; will need to investigate how to provide data
  overpassTargetType: null,
  parent: Number(process.env.MAPROULETTE_PROJECT_ID),
  tags: 'highway',
  presets: [],
  taskStyles: [],
} as const satisfies Record<string, string | number | object | string[] | null>
