/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        raleway: 'Raleway',
        satisfy: 'Nothing You Could Do',
      },

      colors: {
        sixty: '#9BABB8',
        thirty: '#EEE3CB',
        ten: '#D7C0AE',
        accent: '#687ca1',
        taskGreen: '#72F789',
        taskYellow: '#F7EA59',
        taskRed: '#E14330',
      },
      backgroundColor: {
        cover: 'rgba(0, 0, 0, 0.41)',
      },
    },
  },
  plugins: [],
};
