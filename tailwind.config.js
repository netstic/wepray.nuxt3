/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    // colors: {
    //   primary: '#0D4B84',
    //   secondary: '#2196f3',
    //   neutral: '#2B3440',
    //   'neutral-content': '#D7DDE4',
    //   'base-100': '#F2F2F2',
    //   'base-200': '#E5E6E6',
    //   'base-300': '#E5E6E6',
    //   transparent: 'transparent',
    // },
    extend: {
      screens: {
        lg: '1080px',
      },
    },
  },
  plugins: [
    // require('daisyui'),
    require('@tailwindcss/typography'),
  ],

  // daisyui: {
  //   themes: [
  //     {
  //       light: {
  //         'color-scheme': 'light',
  //         primary: '#0D4B84',
  //         secondary: '#2196f3',
  //         neutral: '#2B3440',
  //         'neutral-content': '#D7DDE4',
  //         'base-100': 'oklch(100% 0 0)',
  //         'base-200': '#F2F2F2',
  //         'base-300': '#E5E6E6',
  //         'base-content': '#1f2937',
  //       },
  //     },
  //     {
  //       dark: {
  //         'color-scheme': 'dark',
  //         primary: '#0D4B84',
  //         secondary: '#2196f3',
  //         neutral: '#2B3440',
  //         'neutral-content': '#D7DDE4',
  //         'base-100': '#1f2937',
  //         'base-200': '#2B3440',
  //         'base-300': '#37414E',
  //         'base-content': '#D7DDE4',
  //       },
  //     },
  //   ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
  //   // darkTheme: 'wp-dark', // name of one of the included themes for dark mode
  //   // base: true, // applies background color and foreground color for root element by default
  //   // styled: true, // include daisyUI colors and design decisions for all components
  //   // utils: true, // adds responsive and modifier utility classes
  //   // prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  //   // logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  //   // themeRoot: ':root', // The element that receives theme color CSS variables
  // },
};
