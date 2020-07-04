<template>
  <x-table>
    <thead>
    <tr>
      <td v-for="val, key in keyMap">{{ val }}</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item, i in data" @click="chooseItem(item)" >
      <td v-for="val, key in keyMap" :class="highlightStyle && highlightStyle[key] ? highlightStyle[key](item[key]) : ''">{{ item[key] }}</td>
    </tr>
    </tbody>
  </x-table>
</template>

<script>
  // :class="highlightStyle[key] ? highlightStyle[key](item[key]) : ''"
  export default {
    name: 'trader-table',
    props: ['data', 'keyMap', 'highlightStyle'],
    data () {
      return {}
    },
    methods: {
      chooseItem (val) {
        this.$emit('rowClick', val)
      }
    }
  }
</script>

<style scoped>
  .table-common {
    width: 100%;
  }
  tbody>tr:active, tbody>tr:focus, tbody>tr:hover{
    background-color: #35495e;
  }

  table {
    min-width: 100%;
  }

</style>
