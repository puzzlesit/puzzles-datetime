<template>
  <div class="puzzles-arrow">
    <svg :class="direction"
         height="14px"
         viewBox="0 0 32 32"
         width="14px"
         xmlns="http://www.w3.org/2000/svg">
      <g id="surface1">
        <path d="M 10.910156 31.808594 L 26.257812 16.460938 C 26.5 16.203125 26.5 15.796875 26.257812 15.539062 L 10.90625 0.191406 C 10.652344 -0.0625 10.242188 -0.0625 9.984375 0.191406 L 5.75 4.425781 C 5.496094 4.679688 5.496094 5.09375 5.75 5.347656 L 16.40625 16 L 5.75 26.652344 C 5.503906 26.914062 5.503906 27.316406 5.75 27.574219 L 9.984375 31.808594 C 10.105469 31.933594 10.273438 32 10.445312 32 C 10.621094 32 10.785156 31.933594 10.910156 31.808594 Z M 10.910156 31.808594 "
              style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;"/>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'ArrowIcon',
  props: {
    direction: {
      type: String,
      default: 'right'
    }
  }
}
</script>

<style scoped>
.puzzles-arrow .right {
  transform: rotate(0);
}
.puzzles-arrow .left {
  transform: rotate(180deg);
}

.puzzles-arrow .up {
  transform: rotate(270deg);
}

.puzzles-arrow .down {
  transform: rotate(90deg);
}
</style>