import React, { Component } from "react";
import {
  getMergeSortAnimations,
  getInsertionSortAnimations
} from "../sortingAlgorithms/sortingAlgorithms.js";
import "./SortingVisualizer.css";

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
    for (let i = 0; i < 300; i++) {
      array.push(randInt(5, 800));
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
        }, i * 3);
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
        }, i * 3);
      }
    }
  }

  selectionSort() {}

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

  quickSort() {}

  heapSort() {}

  bubbleSort() {}

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
