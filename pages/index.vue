<template>
  <v-row justify="center" align="center">
    <md-steppers class="stepper__wrapper">
      <md-step id="first" md-label="First Step">
        <md-field>
          <label for="movie">Movie</label>
          <md-select v-model="selected" name="movie" id="movie">
            <md-option
              v-for="item in options"
              :key="item.id"
              :value="item.value"
            >
              {{ item.text }}
            </md-option>
          </md-select>
        </md-field>
        <md-field>
          <label>Initial Value</label>
          <md-input v-model="initial"></md-input>
        </md-field>
        <v-row>
          <v-col cols="6" />
          <v-col cols="2">
            <md-button>Default</md-button>
          </v-col>
          <v-col cols="2">
            <md-button class="md-raised md-accent">Accent</md-button>
          </v-col>
          <v-col cols="2">
            <md-button class="md-raised md-primary">Primary</md-button>
          </v-col>
        </v-row>
      </md-step>

      <md-step id="second" md-label="Second Step">
        
      </md-step>

      <md-step id="third" md-label="Third Step">
        
      </md-step>
    </md-steppers>
  </v-row>
</template>

<script>

export default {
  name: 'Index',
  components: {},
  data () {
    return {
      selected: 1,
      options: [
        { id: 1, value: 1, text: 'test01' },
        { id: 2, value: 2, text: 'test02' },
        { id: 3, value: 3, text: 'test03' },
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.stepper__wrapper {
  width: 100%;
}
</style>
