export function getMergeSortAnimations(arr) {
  const animations = [];
  if (arr.length <= 1) return arr;
  const auxArr = arr.slice();

  mergeSortHelper(arr, 0, arr.length - 1, auxArr, animations);

  return animations;
}

function mergeSortHelper(mainArr, startIdx, endIdx, auxArr, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxArr, startIdx, middleIdx, mainArr, animations);
  mergeSortHelper(auxArr, middleIdx + 1, endIdx, mainArr, animations);
  doMerge(mainArr, startIdx, middleIdx, endIdx, auxArr, animations);
}

function doMerge(mainArr, startIdx, middleIdx, endIdx, auxArr, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    // values that are being compared
    // push them once to change their color.
    animations.push([i, j]);
    // values that are being compared
    // push them a second time to revert their color.
    animations.push([i, j]);
    if (auxArr[i] <= auxArr[j]) {
      // overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxArr[i]]);
      mainArr[k++] = auxArr[i++];
    } else {
      animations.push([k, auxArr[j]]);
      mainArr[k++] = auxArr[j++];
    }
  }

  while (i <= middleIdx) {
    // No comparison; Simply appending the rest of the array.
    animations.push([i, i]);
    animations.push([i, i]);
    // overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxArr[i]]);
    mainArr[k++] = auxArr[i++];
  }
  while (j <= endIdx) {
    // No comparison; Simply appending the rest of the array.
    animations.push([j, j]);
    animations.push([j, j]);
    // overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxArr[j]]);
    mainArr[k++] = auxArr[j++];
  }
}

export function getInsertionSortAnimations(arr) {
  const animations = [];
  if (arr.length <= 1) return arr;

  insertionSort(arr, animations);

  return animations;
}

function insertionSort(arr, animations) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let comp = arr[i - 1];
    let j = i;

    while (j > 0 && comp >= key) {
      animations.push([j, j - 1]);
      animations.push([j, j - 1]);
      animations.push([j, j - 1, arr[j], arr[j - 1]]);

      arr[j] = comp;
      arr[j - 1] = key;

      j--;
      if (j != 0) {
        key = arr[j];
        comp = arr[j - 1];
      }
    }
  }
}
