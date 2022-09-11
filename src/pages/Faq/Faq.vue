<template>
  <section id="education" class="educationMain">
    <h1 class="titulo">FAQ</h1>

    <v-col class="padd">
      <v-expansion-panels multiple>
        <v-expansion-panel v-for="(item,i) in dataFaq" :key="i">
          <v-expansion-panel-header class="h7">
            {{ item.question }}
            <!-- <span>{{ item.question }}</span> -->
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ item.answer }}
            <!-- <span>{{ item.answer }}</span> -->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </section>
</template>

<script>
export default {
  name: "Education",
  data() {
    return {
      dataFaq: [
        {question: 'What is Evie?', answer: 'Evie is an all in one hub featuring a NFT marketplace aggregator, data, education and fun!', select: false },
        {question: 'What is a NFT marketplace aggregator?', answer: 'Evie allow users to quickly buy, sell and sweep across all NEAR marketplaces, all in one transaction.', select: false },
        {question: 'What are the fees?', answer: 'Evie does not have any fees or gated features. Besides listed marketplace fees (Evie does not directly list any NFTs) and gas fees, everything is free.', select: false },
        {question: 'How do I get my NFT project listed in the education section or mint calender?', answer: 'Each section has a proposal. Fill it out and our team will review.', select: false },
      ]
    }
  },
  methods: {
  }
};
</script>

<style src="../pages.scss" lang="scss" />
