<!--
Copyright - 2024 Mike11jr (Mike Grün)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), 
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
...
-->

<style scoped>
.spinner {
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot1,
.dot2,
.dot3 {
  width: 5px;
  height: 5px;
  border: double;
  border-color: white;
  border-radius: 50%;
  margin: 10px;
}

.dot1 {
  animation: jump765 1.3s -0.32s linear infinite;
  background: #fff;
}

.dot2 {
  animation: jump765 1.3s -0.16s linear infinite;
  background: #fff;
}

.dot3 {
  animation: jump765 1.3s linear infinite;
  background: #fff;
}

@keyframes jump765 {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  40% {
    -webkit-transform: scale(2);
    transform: scale(2);
  }
}
</style>

<template>
  <div class="spinner">
    <div class="dot1"></div>
    <div class="dot2"></div>
    <div class="dot3"></div>
  </div>
</template>
