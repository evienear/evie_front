<template>
  <v-navigation-drawer v-model="drawer" fixed id="filterDrawer" width="300px">
    <aside class="container-filter-left">
      <div class="container-filter-left-head">
        <div class="space gap">
          <h5 class="p h10-em">Atribute filter</h5>
          <a class="h11-em" @click="$parent.dataFilterAtribute.forEach(e=>e.list.forEach(e2=>e2.selected=false));$parent.dataChips=[]">Clear all</a>
        </div>
      
        <div>
          <v-chip v-for="(item,i) in DataChips" :key="i" close close-icon="mdi-close" @click:close="
            $parent.dataChips.splice($parent.dataChips.indexOf(item),1);
            $parent.dataFilterAtribute.forEach(e=>{e.list.findIndex(data=>data==item)!==-1?e.list[e.list.findIndex(data=>data==item)].selected=false:null});
          ">
            {{item.name}}
          </v-chip>
        </div>
      </div>

      <v-expansion-panels class="container-filter-left-body">
        <v-expansion-panel v-for="(item,i) in DataFilterAtribute" :key="i">
          <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>

          <v-expansion-panel-content>
            <v-list color="transparent">
              <v-list-item v-for="(item2,i2) in item.list" :key="i2" :class="{selected: item2.selected}" @click="
                item2.selected=!item2.selected; item2.selected?$parent.dataChips.push(item2):$parent.dataChips.splice($parent.dataChips.indexOf(item2),1)
              ">
                <v-list-item-title>{{item2.name}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </aside>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "DrawerFilterMobile",
  props: {
    DataChips: Array,
    DataFilterAtribute: Array,
  },
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
  }
};
</script>

<style src="../pages.scss" lang="scss" />
