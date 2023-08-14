
<template>
  <q-layout view="lHh lpR fFf">

    <q-header reveal bordered class="bg-grey-1 text-black" height-hint="98">
      <q-toolbar>
        <q-btn class="lt-lg" dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-btn class="lg" dense flat round icon="menu" @click="toggleminiState" />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-black.svg">
          </q-avatar> -->
          MAIN
        </q-toolbar-title>

        <q-toolbar-footer style="display: flex; gap: 4px; align-items: center; ">
          USER
          <span class="material-icons" style="font-size: 1.5rem">sentiment_satisfied_alt</span>
        </q-toolbar-footer>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <!-- <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs> -->
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"

        show-if-above

        :mini="miniState"

        :width="280"
        :breakpoint="1023"
        bordered
        class="bg-grey-3">

        <!-- side="right"
        overlay
        show-if-above
        :mini="miniState"
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"> -->
        
      <!-- drawer content -->
      <!-- <q-toolbar>
        <q-toolbar-title>
          <q-item-section size="48px">
            <q-item class="text-h6">Admin Dash</q-item>
          </q-item-section>
        </q-toolbar-title>
      </q-toolbar> -->
      <q-scroll-area class="fit">
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-avatar class="q-logo">
                <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA2MTc3NDkxNjgxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQzNTkiIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyLjM0MTMzMyAxMTQuOTE1NTU2YTM2OS4yMDg4ODkgMzY5LjIwODg4OSAwIDAgMSAyNDUuMTkxMTExIDkzLjU4MjIyMmw4LjM2MjY2NyA3LjM5NTU1NWM0Ny4zODg0NDQgNDMuMDA4IDEyMi4wODM1NTYgMTE5LjgwOCAyMjQuMTk5MTExIDIzMC40IDMxLjU3MzMzMyAzNC4yNDcxMTEgMzIuNzExMTExIDg2LjE4NjY2NyAzLjQxMzMzNCAxMjEuNjI4NDQ1bC0zLjQxMzMzNCAzLjg2ODQ0NC0zNi43NTAyMjIgMzkuODIyMjIyYy04OS42IDk2LjE0MjIyMi0xNTUuMTkyODg5IDE2Mi40NzQ2NjctMTk2Ljc3ODY2NyAxOTguODgzNTU2YTM2OS4yMDg4ODkgMzY5LjIwODg4OSAwIDAgMS0yNDQuMjI0IDkyLjY3MiAzNjkuMjY1Nzc4IDM2OS4yNjU3NzggMCAwIDEtMjQ1LjQxODY2Ni05My42OTZsLTguMzA1Nzc4LTcuMzk1NTU2Yy00Ny4zMzE1NTYtNDMuMDA4LTEyMS45Njk3NzgtMTE5Ljc1MTExMS0yMjMuOTcxNTU2LTIzMC4yMjkzMzNhOTIuNDQ0NDQ0IDkyLjQ0NDQ0NCAwIDAgMS0zLjQxMzMzMy0xMjEuNzQyMjIybDMuNDEzMzMzLTMuODExNTU2IDQ1LjUxMTExMS00OS4wMzgyMjJDMTY0LjgwNzExMSAzMDYuNzQ0ODg5IDIyNi45ODY2NjcgMjQzLjg4MjY2NyAyNjYuODA4ODg5IDIwOC42Njg0NDRBMzY5LjI2NTc3OCAzNjkuMjY1Nzc4IDAgMCAxIDUxMi4zNDEzMzMgMTE0LjkxNTU1NnogbTAgNjkuNTc1MTExYTI5OS4yMzU1NTYgMjk5LjIzNTU1NiAwIDAgMC0xOTkuMTExMTExIDc2LjIzMTExMWwtNy45NjQ0NDQgNy4wNTQyMjJjLTQxLjA3Mzc3OCAzNy4zNzYtMTA1LjUyODg4OSAxMDMuMTM5NTU2LTE5Mi4zOTgyMjIgMTk2LjYwOGwtMjYuODUxNTU2IDI5LjAxMzMzM2EyMy4wOTY4ODkgMjMuMDk2ODg5IDAgMCAwIDAgMzEuMzQ1Nzc4bDM1LjM4NDg4OSAzOC4xMTU1NTZjODguMjkxNTU2IDk0Ljc3Njg4OSAxNTIuNTE5MTExIDE1OS44NTc3NzggMTkxLjgyOTMzMyAxOTQuNTZhMjk5LjIzNTU1NiAyOTkuMjM1NTU2IDAgMCAwIDE5OS4xMTExMTEgNzYuMjMxMTExYzczLjM4NjY2NyAwIDE0Mi43OTExMTEtMjYuOTA4NDQ0IDE5OC4xNDQtNzUuMzc3Nzc4bDcuOTY0NDQ1LTcuMDU0MjIyYzQxLjM1ODIyMi0zNy4zNzYgMTA2LjA5Nzc3OC0xMDMuMzY3MTExIDE5My4zMDg0NDQtMTk3LjI5MDY2N2wyNi45NjUzMzQtMjkuMTI3MTExYTIzLjA5Njg4OSAyMy4wOTY4ODkgMCAwIDAgMC0zMS40MDI2NjdsLTQzLjkxODIyMy00Ny4yMTc3NzdjLTgzLjk2OC04OS45NDEzMzMtMTQ1LjQ2NDg4OS0xNTIuMDY0LTE4My41MjM1NTUtMTg1LjYyODQ0NWEyOTkuMjM1NTU2IDI5OS4yMzU1NTYgMCAwIDAtMTk4Ljk0MDQ0NS03Ni4wNjA0NDR6IG0wIDExNS4xNDMxMTFhMjA5LjA2NjY2NyAyMDkuMDY2NjY3IDAgMCAxIDIwOC42Njg0NDUgMjA5LjQ2NDg4OSAyMDkuMDY2NjY3IDIwOS4wNjY2NjcgMCAwIDEtMjA4LjY2ODQ0NSAyMDkuNDY0ODg5QTIwOS4wNjY2NjcgMjA5LjA2NjY2NyAwIDAgMSAzMDMuNzg2NjY3IDUwOS4wOTg2NjdhMjA5LjA2NjY2NyAyMDkuMDY2NjY3IDAgMCAxIDIwOC42MTE1NTUtMjA5LjQ2NDg4OXogbTAgNjkuODAyNjY2QTEzOS4zNzc3NzggMTM5LjM3Nzc3OCAwIDAgMCAzNzMuMjQ4IDUwOS4xNTU1NTZhMTM5LjM3Nzc3OCAxMzkuMzc3Nzc4IDAgMCAwIDEzOS4wOTMzMzMgMTM5LjYwNTMzMyAxMzkuMzc3Nzc4IDEzOS4zNzc3NzggMCAwIDAgMTM5LjE1MDIyMy0xMzkuNjA1MzMzIDEzOS4zNzc3NzggMTM5LjM3Nzc3OCAwIDAgMC0xMzkuMTUwMjIzLTEzOS42NjIyMjN6IiBmaWxsPSIjRkY4MTNDIiBwLWlkPSI0MzYwIj48L3BhdGg+PC9zdmc+" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-toolbar-title
                shrink
                class="text-bold"
                :style="drawerStylesFontColor"
              >
                AdminDash
              </q-toolbar-title>

            </q-item-section>
          </q-item>                      
          <q-item
            clickable
            v-ripple
            to="/dashboard"
          >
            <q-item-section avatar>
              <q-icon name="chat" />
            </q-item-section>
            <q-item-section>
              Dashboard
            </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            to="/table_sample"
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Table - Simple
            </q-item-section>
          </q-item>        
          <q-item
            clickable
            v-ripple
            to="/table_advance"
          >
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Table Advance
            </q-item-section>
          </q-item>        
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>        
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>        
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>        
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>        
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>        
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>        
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>        
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>        
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>        
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>        
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>        
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay behavior="mobile" bordered>
      <!-- drawer content -->
      Right Drawer
    </q-drawer>

    <q-page-container>
      <nav>
        <router-link to="/">Home</router-link> | 
        <router-link to="/todos">Todos</router-link> | 
        <router-link to="/about">About</router-link>
      </nav>
      <router-view/>
    </q-page-container>

    <q-footer reveal bordered class="bg-grey-8 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <div>Quasar</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const miniState = ref(false)

    return {
      miniState,
      toggleminiState () {
        miniState.value = !miniState.value
      },

      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>