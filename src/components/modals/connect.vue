<template>
  <v-dialog v-model="modalConnect" content-class="modal-connect divcol relative isolate" hide-overlay>
    <aside class="space">
      <span class="h9_em">Connect Wallet</span>
      
      <v-btn icon @click="modalConnect = false">
        <v-icon size="1.5em">mdi-close</v-icon>
      </v-btn>
    </aside>

    <v-sheet class="grid" color="transparent">
      <v-btn plain @click="$parent.loginNear('near')">
        <img src="@/assets/logo/near-wallet-icon.svg" alt="near">
        
        <div class="divcol astart" style="gap: 5px">
          <span class="h12_em bold">NEAR</span>
          <span class="h13_em">wallet.near.org</span>
        </div>
      </v-btn>
      
      <v-btn plain color="hsl(0 0% 0% / .5)" @click="$parent.loginNear('myNear')">
        <img src="@/assets/logo/my-near-wallet-icon.svg" alt="near">
        
        <div class="divcol astart" style="gap: 5px">
          <span class="h12_em bold">MyNearWallet</span>
          <span class="h13_em">mynearwallet.com</span>
        </div>
      </v-btn>
      
      <!-- <v-btn plain color="hsl(0 0% 0% / .5)" @click="$parent.loginNear('sender')">
        <img src="@/assets/logo/sender-icon.svg" alt="near">
        
        <div class="divcol astart" style="gap: 5px">
          <span class="h12_em bold">Sender</span>
          <span class="h13_em">sender.org</span>
        </div>
      </v-btn> -->
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  name: "ConnectModal",
  data() {
    return {
      modalConnect: false,
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="scss">
$clip-path: polygon(
  0% var(--corner-size),
  var(--corner-size) var(--corner-size),
  var(--corner-size) 0%,
  calc(100% - var(--corner-size)) 0%,
  calc(100% - var(--corner-size)) var(--corner-size),
  100% var(--corner-size),
  100% calc(100% - var(--corner-size)),
  calc(100% - var(--corner-size)) calc(100% - var(--corner-size)),
  calc(100% - var(--corner-size)) 100%,
  var(--corner-size) 100%,
  var(--corner-size) calc(100% - var(--corner-size)),
  0% calc(100% - var(--corner-size))
);

//- cards -//
@mixin card() {
  --w: initial;
  --max-w: none;
  --min-w: none;
  --h: initial;
  --max-h: none;
  --min-h: none;
  --bg: initial;
  --c: var(--clr);
  --p: 1em;
  --br: 0;
  --bs: initial;
  --f: initial;
  --t: initial;

  width: var(--w) !important;
  max-width: var(--max-w) !important;
  min-width: var(--min-w) !important;
  height: var(--h) !important;
  max-height: var(--max-h) !important;
  min-height: var(--min-h) !important;
  background: var(--bg) !important;
  color: var(--c) !important;
  box-shadow: var(--bs) !important;
  border-radius: var(--br) !important;
  padding: var(--p);
  transform: var(--t);
  filter: var(--f);
  
  clip-path: $clip-path;
  position: relative;
  isolation: isolate;
}

.modal-connect {
  @include card;
  --min-w: 330px;
  --w: max-content;
  --bg: center url(../../assets/doggy-slider/gradient.png);
  --p: 30px;
  --tt: capitalize;
  gap: 20px;
  
  &::before {
    content: "";
    position: absolute;
    inset: var(--corner-size);
    border-radius: inherit;
    background: #272727 !important;
    z-index: -1;
    clip-path: $clip-path;
  }

  i {color: hsl(225 225% 225% / .5) !important}
  span {color: #fff}

  .v-sheet.grid {
    display: grid;
    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    gap: 20px;
    .v-btn {
      font-size: 14px;
      width: 100%;
      min-height: 70px;
      border-radius: 10px;
      background-color: hsl(0 0% 0% / .2);
      transition: .2s ease;
      &:hover {
        background-color: hsl(0 0% 0% / .4);
        transform: translateY(-5px) !important;
      }
      &__content {
        justify-content: flex-start;
        gap: 10px;
        img {
          width: 40px;
          object-fit: cover;
        }
        span + span {
          color: hsl(225 225% 225% / .5);
        }
      }
    }
  }
}
</style>
