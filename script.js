// =====================================================
// SORTLAB
// SORTING ALGORITHM VISUALIZER
// =====================================================


// =====================================================
// GET HTML ELEMENTS
// =====================================================

const numbersInput =
    document.getElementById("numbers");

const algorithmSelect =
    document.getElementById("algorithm");

const barsContainer =
    document.getElementById("bars");

const startButton =
    document.getElementById("startBtn");

const pauseButton =
    document.getElementById("pauseBtn");

const randomButton =
    document.getElementById("randomBtn");

const resetButton =
    document.getElementById("resetBtn");

const speedSlider =
    document.getElementById("speed");

const statusText =
    document.getElementById("status");

const algorithmStat =
    document.getElementById("algorithmStat");

const comparisonStat =
    document.getElementById("comparisonStat");

const swapStat =
    document.getElementById("swapStat");

const algorithmInfo =
    document.getElementById("algorithmInfo");


// =====================================================
// COMPARISON ELEMENTS
// =====================================================

const compareIndex1 =
    document.getElementById(
        "compareIndex1"
    );

const compareIndex2 =
    document.getElementById(
        "compareIndex2"
    );

const compareValue1 =
    document.getElementById(
        "compareValue1"
    );

const compareValue2 =
    document.getElementById(
        "compareValue2"
    );

const comparisonMessage =
    document.getElementById(
        "comparisonMessage"
    );

const explanation =
    document.getElementById(
        "explanation"
    );


// =====================================================
// VARIABLES
// =====================================================

let numbers = [
    7,
    4,
    2,
    1,
    8,
    3,
    6,
    5
];

let originalNumbers =
    [...numbers];

let comparisons = 0;

let swaps = 0;

let sorting = false;

let paused = false;

let algorithm = "bubble";


// =====================================================
// ALGORITHM NAMES
// =====================================================

const algorithmNames = {

    bubble:
        "Bubble Sort",

    insertion:
        "Insertion Sort",

    selection:
        "Selection Sort",

    quick:
        "Quick Sort",

    merge:
        "Merge Sort",

    heap:
        "Heap Sort"
};


// =====================================================
// ALGORITHM INFORMATION
// =====================================================

const algorithmDescriptions = {

    bubble:
        "Bubble Sort repeatedly compares adjacent elements and swaps them when they are in the wrong order.",

    insertion:
        "Insertion Sort takes one element at a time and inserts it into its correct position in the sorted section.",

    selection:
        "Selection Sort finds the smallest element from the unsorted section and places it at the beginning.",

    quick:
        "Quick Sort selects a pivot and divides the array into smaller and larger elements around that pivot.",

    merge:
        "Merge Sort divides the array into smaller parts and merges them back together in sorted order.",

    heap:
        "Heap Sort builds a heap and repeatedly moves the largest element to the end of the array."
};


// =====================================================
// GET USER NUMBERS
// =====================================================

function getUserNumbers() {

    const text =
        numbersInput.value.trim();


    if (
        text === ""
    ) {

        return [];
    }


    const parts =
        text.split(",");


    const result = [];


    for (
        const part of parts
    ) {

        const value =
            Number(
                part.trim()
            );


        if (
            Number.isFinite(value)
        ) {

            result.push(value);
        }

    }


    return result.slice(
        0,
        30
    );
}


// =====================================================
// UPDATE STATISTICS
// =====================================================

function updateStats() {

    comparisonStat.textContent =
        comparisons;


    swapStat.textContent =
        swaps;


    algorithmStat.textContent =
        algorithmNames[algorithm];


    algorithmInfo.textContent =
        algorithmDescriptions[algorithm];
}


// =====================================================
// DRAW BARS
// =====================================================

function drawBars(
    highlighted = [],
    type = "compare",
    sorted = false
) {

    barsContainer.innerHTML = "";


    if (
        numbers.length === 0
    ) {

        return;
    }


    const maxValue =
        Math.max(
            ...numbers.map(
                value =>
                    Math.abs(value)
            ),
            1
        );


    numbers.forEach(
        (
            value,
            index
        ) => {

            const bar =
                document.createElement(
                    "div"
                );


            bar.className =
                "bar";


            // Calculate height

            let height =
                (
                    Math.abs(value)
                    /
                    maxValue
                ) * 90;


            if (
                height < 5
            ) {

                height = 5;
            }


            bar.style.height =
                height + "%";


            // Highlight bars

            if (
                highlighted.includes(
                    index
                )
            ) {

                bar.classList.add(
                    type
                );
            }


            // Sorted bars

            if (
                sorted
            ) {

                bar.classList.add(
                    "sorted"
                );
            }


            // Number on bar

            const number =
                document.createElement(
                    "span"
                );


            number.textContent =
                value;


            bar.appendChild(
                number
            );


            barsContainer.appendChild(
                bar
            );

        }
    );
}


// =====================================================
// SHOW CURRENT COMPARISON
// =====================================================

function showComparison(
    index1,
    index2,
    operation = "compare"
) {

    const value1 =
        numbers[index1];

    const value2 =
        numbers[index2];


    // Positions

    compareIndex1.textContent =
        `Position ${index1 + 1}`;


    compareIndex2.textContent =
        `Position ${index2 + 1}`;


    // Values

    compareValue1.textContent =
        value1;


    compareValue2.textContent =
        value2;


    // Reset message classes

    comparisonMessage.classList.remove(
        "swap-message"
    );

    comparisonMessage.classList.remove(
        "no-swap-message"
    );


    // Normal comparison

    if (
        operation === "compare"
    ) {

        if (
            value1 > value2
        ) {

            comparisonMessage.textContent =
                `${value1} > ${value2} → SWAP REQUIRED 🔄`;

            comparisonMessage.classList.add(
                "swap-message"
            );


            explanation.textContent =
                `Because ${value1} is greater than ${value2}, `
                +
                `they are in the wrong order for ascending sorting. `
                +
                `Therefore, they must be swapped.`;

        }


        else if (
            value1 < value2
        ) {

            comparisonMessage.textContent =
                `${value1} < ${value2} → NO SWAP ✓`;

            comparisonMessage.classList.add(
                "no-swap-message"
            );


            explanation.textContent =
                `Because ${value1} is smaller than ${value2}, `
                +
                `they are already in the correct ascending order. `
                +
                `Therefore, no swap is required.`;

        }


        else {

            comparisonMessage.textContent =
                `${value1} = ${value2} → NO SWAP ✓`;

            comparisonMessage.classList.add(
                "no-swap-message"
            );


            explanation.textContent =
                `Both numbers are equal, so there is no need to swap them.`;
        }

    }


    // Swap operation

    else if (
        operation === "swap"
    ) {

        comparisonMessage.textContent =
            `${value1} ↔ ${value2} → SWAPPING 🔄`;

        comparisonMessage.classList.add(
            "swap-message"
        );


        explanation.textContent =
            `The two numbers are being exchanged because `
            +
            `they were in the wrong order.`;
    }


    // Insertion

    else if (
        operation === "insert"
    ) {

        comparisonMessage.textContent =
            `Insert ${value1} before ${value2}`;

        explanation.textContent =
            `${value1} is being moved to its correct position.`;
    }
}


// =====================================================
// CLEAR COMPARISON
// =====================================================

function clearComparison() {

    compareIndex1.textContent =
        "Position —";

    compareIndex2.textContent =
        "Position —";


    compareValue1.textContent =
        "—";

    compareValue2.textContent =
        "—";


    comparisonMessage.textContent =
        "Waiting for comparison...";


    comparisonMessage.classList.remove(
        "swap-message"
    );


    comparisonMessage.classList.remove(
        "no-swap-message"
    );


    explanation.textContent =
        "Choose an algorithm and press Start to see how the numbers are compared.";
}


// =====================================================
// WAIT
// =====================================================

function wait(
    milliseconds
) {

    return new Promise(
        resolve => {

            setTimeout(
                resolve,
                milliseconds
            );

        }
    );
}


// =====================================================
// SPEED
// =====================================================

function getSpeed() {

    const value =
        Number(
            speedSlider.value
        );


    return 850 - value;
}


// =====================================================
// CHECK PAUSE
// =====================================================

async function checkPause() {

    while (
        paused
    ) {

        await wait(100);
    }
}


// =====================================================
// BUBBLE SORT
// =====================================================

async function bubbleSort() {

    const n =
        numbers.length;


    for (
        let i = 0;

        i < n - 1;

        i++
    ) {


        for (
            let j = 0;

            j < n - 1 - i;

            j++
        ) {

            await checkPause();


            // Show comparison

            drawBars(
                [j, j + 1],
                "compare"
            );


            showComparison(
                j,
                j + 1,
                "compare"
            );


            comparisons++;

            updateStats();


            statusText.textContent =
                `Bubble Sort: Comparing positions ${j + 1} and ${j + 2}`;


            await wait(
                getSpeed()
            );


            // Swap

            if (
                numbers[j]
                >
                numbers[j + 1]
            ) {

                [
                    numbers[j],
                    numbers[j + 1]
                ] =
                [
                    numbers[j + 1],
                    numbers[j]
                ];


                swaps++;

                updateStats();


                drawBars(
                    [j, j + 1],
                    "swap"
                );


                showComparison(
                    j,
                    j + 1,
                    "swap"
                );


                statusText.textContent =
                    "🔄 Swapping the two numbers";


                await wait(
                    getSpeed()
                );
            }

        }

    }
}


// =====================================================
// INSERTION SORT
// =====================================================

async function insertionSort() {

    for (
        let i = 1;

        i < numbers.length;

        i++
    ) {

        let key =
            numbers[i];


        let j =
            i - 1;


        while (
            j >= 0
        ) {

            await checkPause();


            drawBars(
                [j, j + 1],
                "compare"
            );


            showComparison(
                j,
                j + 1,
                "compare"
            );


            comparisons++;

            updateStats();


            statusText.textContent =
                `Insertion Sort: Comparing ${numbers[j]} and ${key}`;


            await wait(
                getSpeed()
            );


            if (
                numbers[j]
                <=
                key
            ) {

                break;
            }


            numbers[j + 1] =
                numbers[j];


            swaps++;

            updateStats();


            drawBars(
                [j, j + 1],
                "swap"
            );


            showComparison(
                j,
                j + 1,
                "swap"
            );


            await wait(
                getSpeed()
            );


            j--;
        }


        numbers[j + 1] =
            key;

    }
}


// =====================================================
// SELECTION SORT
// =====================================================

async function selectionSort() {

    const n =
        numbers.length;


    for (
        let i = 0;

        i < n - 1;

        i++
    ) {

        let minIndex =
            i;


        for (
            let j = i + 1;

            j < n;

            j++
        ) {

            await checkPause();


            drawBars(
                [minIndex, j],
                "compare"
            );


            showComparison(
                minIndex,
                j,
                "compare"
            );


            comparisons++;

            updateStats();


            statusText.textContent =
                `Selection Sort: Finding the smallest number`;


            await wait(
                getSpeed()
            );


            if (
                numbers[j]
                <
                numbers[minIndex]
            ) {

                minIndex =
                    j;
            }

        }


        if (
            minIndex !== i
        ) {

            [
                numbers[i],
                numbers[minIndex]
            ] =
            [
                numbers[minIndex],
                numbers[i]
            ];


            swaps++;

            updateStats();


            drawBars(
                [i, minIndex],
                "swap"
            );


            showComparison(
                i,
                minIndex,
                "swap"
            );


            await wait(
                getSpeed()
            );
        }

    }
}


// =====================================================
// QUICK SORT
// =====================================================

async function quickSort(
    left,
    right
) {

    if (
        left >= right
    ) {

        return;
    }


    await checkPause();


    const pivot =
        numbers[right];


    let i =
        left;


    for (
        let j = left;

        j < right;

        j++
    ) {

        await checkPause();


        drawBars(
            [j, right],
            "compare"
        );


        showComparison(
            j,
            right,
            "compare"
        );


        comparisons++;

        updateStats();


        statusText.textContent =
            `Quick Sort: Comparing with pivot ${pivot}`;


        await wait(
            getSpeed()
        );


        if (
            numbers[j]
            <
            pivot
        ) {

            [
                numbers[i],
                numbers[j]
            ] =
            [
                numbers[j],
                numbers[i]
            ];


            swaps++;

            updateStats();


            drawBars(
                [i, j],
                "swap"
            );


            showComparison(
                i,
                j,
                "swap"
            );


            await wait(
                getSpeed()
            );


            i++;
        }

    }


    [
        numbers[i],
        numbers[right]
    ] =
    [
        numbers[right],
        numbers[i]
    ];


    swaps++;

    updateStats();


    drawBars(
        [i, right],
        "swap"
    );


    showComparison(
        i,
        right,
        "swap"
    );


    await wait(
        getSpeed()
    );


    await quickSort(
        left,
        i - 1
    );


    await quickSort(
        i + 1,
        right
    );
}


// =====================================================
// MERGE
// =====================================================

async function merge(
    left,
    middle,
    right
) {

    const leftPart =
        numbers.slice(
            left,
            middle + 1
        );


    const rightPart =
        numbers.slice(
            middle + 1,
            right + 1
        );


    let i = 0;

    let j = 0;

    let k = left;


    while (
        i < leftPart.length
        &&
        j < rightPart.length
    ) {

        await checkPause();


        comparisons++;

        updateStats();


        // Show positions when possible

        drawBars(
            [k],
            "compare"
        );


        comparisonMessage.textContent =
            `${leftPart[i]} VS ${rightPart[j]}`;


        explanation.textContent =
            `Merge Sort compares values from the two sorted sections and places the smaller value first.`;


        statusText.textContent =
            "Merge Sort: Merging sorted sections";


        await wait(
            getSpeed()
        );


        if (
            leftPart[i]
            <=
            rightPart[j]
        ) {

            numbers[k] =
                leftPart[i];

            i++;

        }

        else {

            numbers[k] =
                rightPart[j];

            j++;

            swaps++;
        }


        updateStats();


        drawBars(
            [k],
            "swap"
        );


        await wait(
            getSpeed()
        );


        k++;
    }


    while (
        i < leftPart.length
    ) {

        numbers[k] =
            leftPart[i];

        i++;

        k++;

        swaps++;

        updateStats();


        drawBars(
            [k - 1],
            "swap"
        );


        await wait(
            getSpeed()
        );
    }


    while (
        j < rightPart.length
    ) {

        numbers[k] =
            rightPart[j];

        j++;

        k++;

        swaps++;

        updateStats();


        drawBars(
            [k - 1],
            "swap"
        );


        await wait(
            getSpeed()
        );
    }
}


// =====================================================
// MERGE SORT
// =====================================================

async function mergeSort(
    left,
    right
) {

    if (
        left >= right
    ) {

        return;
    }


    const middle =
        Math.floor(
            (left + right) / 2
        );


    await mergeSort(
        left,
        middle
    );


    await mergeSort(
        middle + 1,
        right
    );


    await merge(
        left,
        middle,
        right
    );
}


// =====================================================
// HEAPIFY
// =====================================================

async function heapify(
    n,
    i
) {

    let largest =
        i;


    const left =
        2 * i + 1;


    const right =
        2 * i + 2;


    if (
        left < n
        &&
        numbers[left]
        >
        numbers[largest]
    ) {

        largest =
            left;
    }


    if (
        right < n
        &&
        numbers[right]
        >
        numbers[largest]
    ) {

        largest =
            right;
    }


    if (
        largest !== i
    ) {

        await checkPause();


        comparisons++;

        updateStats();


        drawBars(
            [i, largest],
            "compare"
        );


        showComparison(
            i,
            largest,
            "compare"
        );


        await wait(
            getSpeed()
        );


        [
            numbers[i],
            numbers[largest]
        ] =
        [
            numbers[largest],
            numbers[i]
        ];


        swaps++;

        updateStats();


        drawBars(
            [i, largest],
            "swap"
        );


        showComparison(
            i,
            largest,
            "swap"
        );


        await wait(
            getSpeed()
        );


        await heapify(
            n,
            largest
        );
    }
}


// =====================================================
// HEAP SORT
// =====================================================

async function heapSort() {

    const n =
        numbers.length;


    // Build heap

    for (
        let i =
            Math.floor(n / 2) - 1;

        i >= 0;

        i--
    ) {

        await heapify(
            n,
            i
        );
    }


    // Remove elements

    for (
        let end = n - 1;

        end > 0;

        end--
    ) {

        await checkPause();


        [
            numbers[0],
            numbers[end]
        ] =
        [
            numbers[end],
            numbers[0]
        ];


        swaps++;

        updateStats();


        drawBars(
            [0, end],
            "swap"
        );


        showComparison(
            0,
            end,
            "swap"
        );


        await wait(
            getSpeed()
        );


        await heapify(
            end,
            0
        );
    }
}


// =====================================================
// START SORTING
// =====================================================

async function startSorting() {

    if (
        sorting
    ) {

        return;
    }


    const userNumbers =
        getUserNumbers();


    // Validate

    if (
        userNumbers.length < 2
    ) {

        statusText.textContent =
            "⚠ Please enter at least 2 valid numbers.";

        return;
    }


    numbers =
        [...userNumbers];


    originalNumbers =
        [...userNumbers];


    comparisons = 0;

    swaps = 0;


    algorithm =
        algorithmSelect.value;


    sorting = true;

    paused = false;


    updateStats();

    drawBars();

    clearComparison();


    // Disable controls

    startButton.disabled =
        true;


    randomButton.disabled =
        true;


    resetButton.disabled =
        true;


    pauseButton.disabled =
        false;


    pauseButton.textContent =
        "⏸ Pause";


    statusText.textContent =
        `Starting ${algorithmNames[algorithm]}...`;


    try {

        // Bubble

        if (
            algorithm === "bubble"
        ) {

            await bubbleSort();
        }


        // Insertion

        else if (
            algorithm === "insertion"
        ) {

            await insertionSort();
        }


        // Selection

        else if (
            algorithm === "selection"
        ) {

            await selectionSort();
        }


        // Quick

        else if (
            algorithm === "quick"
        ) {

            await quickSort(
                0,
                numbers.length - 1
            );
        }


        // Merge

        else if (
            algorithm === "merge"
        ) {

            await mergeSort(
                0,
                numbers.length - 1
            );
        }


        // Heap

        else if (
            algorithm === "heap"
        ) {

            await heapSort();
        }


        // Final display

        drawBars(
            [],
            "compare",
            true
        );


        statusText.textContent =
            `🏆 ${algorithmNames[algorithm]} completed successfully!`;


        comparisonMessage.textContent =
            "✓ Sorting completed!";


        explanation.textContent =
            "All numbers are now arranged in ascending order.";

    }


    catch (error) {

        console.error(
            error
        );


        statusText.textContent =
            "❌ Something went wrong while sorting.";
    }


    finally {

        sorting = false;

        paused = false;


        startButton.disabled =
            false;


        randomButton.disabled =
            false;


        resetButton.disabled =
            false;


        pauseButton.disabled =
            false;


        pauseButton.textContent =
            "⏸ Pause";
    }
}


// =====================================================
// PAUSE / RESUME
// =====================================================

pauseButton.addEventListener(
    "click",
    () => {

        if (
            !sorting
        ) {

            return;
        }


        paused =
            !paused;


        if (
            paused
        ) {

            pauseButton.textContent =
                "▶ Resume";


            statusText.textContent =
                "⏸ Sorting paused.";

        }

        else {

            pauseButton.textContent =
                "⏸ Pause";


            statusText.textContent =
                "▶ Sorting resumed.";
        }

    }
);


// =====================================================
// START BUTTON
// =====================================================

startButton.addEventListener(
    "click",
    startSorting
);


// =====================================================
// RANDOM NUMBERS
// =====================================================

randomButton.addEventListener(
    "click",
    () => {

        if (
            sorting
        ) {

            return;
        }


        numbers =
            Array.from(
                {
                    length: 8
                },

                () =>
                    Math.floor(
                        Math.random() * 50
                    ) + 1
            );


        originalNumbers =
            [...numbers];


        numbersInput.value =
            numbers.join(",");


        comparisons = 0;

        swaps = 0;


        updateStats();

        drawBars();

        clearComparison();


        statusText.textContent =
            "🎲 Random numbers generated.";

    }
);


// =====================================================
// RESET
// =====================================================

resetButton.addEventListener(
    "click",
    () => {

        if (
            sorting
        ) {

            return;
        }


        numbers =
            [...originalNumbers];


        numbersInput.value =
            numbers.join(",");


        comparisons = 0;

        swaps = 0;


        updateStats();

        drawBars();

        clearComparison();


        statusText.textContent =
            "↻ Reset completed.";

    }
);


// =====================================================
// ALGORITHM CHANGE
// =====================================================

algorithmSelect.addEventListener(
    "change",
    () => {

        if (
            sorting
        ) {

            return;
        }


        algorithm =
            algorithmSelect.value;


        updateStats();

        clearComparison();


        statusText.textContent =
            `${algorithmNames[algorithm]} selected.`;

    }
);


// =====================================================
// INPUT CHANGE
// =====================================================

numbersInput.addEventListener(
    "change",
    () => {

        if (
            sorting
        ) {

            return;
        }


        const newNumbers =
            getUserNumbers();


        if (
            newNumbers.length >= 2
        ) {

            numbers =
                [...newNumbers];


            originalNumbers =
                [...newNumbers];


            comparisons = 0;

            swaps = 0;


            updateStats();

            drawBars();

            clearComparison();


            statusText.textContent =
                "Numbers updated.";

        }

    }
);


// =====================================================
// INITIAL DISPLAY
// =====================================================

algorithm =
    algorithmSelect.value;


updateStats();

drawBars();

clearComparison();