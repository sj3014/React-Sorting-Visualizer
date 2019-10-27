import React, { Component } from "react";
import {
  getMergeSortAnimations,
  getInsertionSortAnimations,
  getQuickSortAnimations,
  getSelectionSortAnimations,
  getBubbleSortAnimations
} from "../sortingAlgorithms/sortingAlgorithms.js";
import "./SortingVisualizer.css";
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import { is } from "@babel/types";

class SortingVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 180; i++) {
      // 180
      array.push(randInt(5, 750)); // 750
    }
    this.setState({ array });
  }

  insertionSort() {
    const animations = getInsertionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barKeyIdx, barCompIdx] = animations[i];
        const barKeyStyle = arrayBars[barKeyIdx].style;
        const barCompStyle = arrayBars[barCompIdx].style;
        const color = i % 3 === 0 ? "red" : "turquoise";

        setTimeout(() => {
          barKeyStyle.backgroundColor = color;
          barCompStyle.backgroundColor = color;
        }, i * 1);
      } else {
        setTimeout(() => {
          const [
            barKeyIdx,
            barCompIdx,
            barKeyHeight,
            barCompHeight
          ] = animations[i];
          const barKeyStyle = arrayBars[barKeyIdx].style;
          const barCompStyle = arrayBars[barCompIdx].style;
          barKeyStyle.height = `${barCompHeight}px`;
          barCompStyle.height = `${barKeyHeight}px`;
        }, i * 1);
      }
    }
  }

  selectionSort() {
    const animations = getSelectionSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barMinIdx, barCompIdx] = animations[i];
        const barMinStyle = arrayBars[barMinIdx].style;
        const barCompStyle = arrayBars[barCompIdx].style;
        const color = i % 3 === 0 ? "red" : "turquoise";

        setTimeout(() => {
          barMinStyle.backgroundColor = color;
          barCompStyle.backgroundColor = color;
        }, i * 3);
      } else {
        setTimeout(() => {
          const [
            barMinIdx,
            barCompIdx,
            barMinHeight,
            barCompHeight
          ] = animations[i];
          const barMinStyle = arrayBars[barMinIdx].style;
          const barCompStyle = arrayBars[barCompIdx].style;
          barMinStyle.height = `${barMinHeight}px`;
          barCompStyle.height = `${barCompHeight}px`;
        }, i * 3);
      }
    }
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "red" : "turquoise";

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * 5);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * 5);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    let currentPivotIdx = animations[0][2];
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barSmallIdx, barPartitionIdx, pivotIdx] = animations[i];
        const barSmallStyle = arrayBars[barSmallIdx].style;
        const barPartitionStyle = arrayBars[barPartitionIdx].style;
        const barPivotStyle = arrayBars[pivotIdx].style;
        const color = i % 3 === 0 ? "red" : "turquoise";

        setTimeout(() => {
          barSmallStyle.backgroundColor = color;
          barPartitionStyle.backgroundColor = color;

          // current pivot bar
          barPivotStyle.backgroundColor = "black";
          if (currentPivotIdx !== pivotIdx) {
            arrayBars[currentPivotIdx].style.backgroundColor = "turquoise";
            currentPivotIdx = pivotIdx;
          }
        }, i * 10);
      } else {
        setTimeout(() => {
          const [
            barSmallIdx,
            barPartitionIdx,
            barNewHeight,
            barOldHeight
          ] = animations[i];
          const barSmallStyle = arrayBars[barSmallIdx].style;
          const barPartitionStyle = arrayBars[barPartitionIdx].style;
          barSmallStyle.height = `${barNewHeight}px`;
          barPartitionStyle.height = `${barOldHeight}px`;

          if (i + 1 === animations.length) {
            arrayBars[currentPivotIdx].style.backgroundColor = "turquoise";
          }
        }, i * 10);
      }
    }
  }

  heapSort() {}

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barLeftIdx, barRightIdx] = animations[i];
        const barLeftStyle = arrayBars[barLeftIdx].style;
        const barRightStyle = arrayBars[barRightIdx].style;
        const color = i % 3 === 0 ? "red" : "turquoise";

        setTimeout(() => {
          barLeftStyle.backgroundColor = color;
          barRightStyle.backgroundColor = color;
        }, i * 1);
      } else {
        setTimeout(() => {
          const [
            barLeftIdx,
            barRightIdx,
            barLeftHeight,
            barRightHeight
          ] = animations[i];
          const barLeftStyle = arrayBars[barLeftIdx].style;
          const barRightStyle = arrayBars[barRightIdx].style;
          barLeftStyle.height = `${barLeftHeight}px`;
          barRightStyle.height = `${barRightHeight}px`;
        }, i * 1);
      }
    }
  }

  render() {
    const { array } = this.state;
    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{ height: `${value}px` }}
          ></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.insertionSort()}>Insertion Sort</button>
        <button onClick={() => this.selectionSort()}>Selection Sort</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
