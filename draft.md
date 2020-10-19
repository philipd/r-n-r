# Linked Lists

## Introduction
If you've spent more than a couple of hours in your life coding, then you've almost certainly heard of arrays. Arrays are just one example of a *data structure*--a way of collecting multiple pieces of data together in an organized way so they can be used more effectively. Objects, hashes, and dictionaries are other examples of data structures. In this article, we'll take a quick look at a data structure that you might be less familiar with: the *linked list*. We'll also take a close look at arrays so we can compare the two, and examine both in the context of JavaScript.

## What is a linked list?
The basic idea behind linked lists is disarmingly simple: store each piece of data together with a reference to the location of the next piece of data, and mark the end of the list with a special value like *zero* or *null*. All we need to know is the location of the first piece of data, and we can find the rest by following the references. It's a bit like a treasure hunt where each hidden clue tells you the location of the next clue.

Here's an example of a linked list:

![An example of a linked list](https://github.com/philipd/r-n-r/raw/master/images/linked-list.png)

(In case you're wondering, '0x' is a common convention for notating [hexadecimal numbers](https://en.wikipedia.org/wiki/Hexadecimal))

Inserting new values into the middle of the list is easy as pie; just copy the reference in the preceding element to the new element, then change the reference in the preceding element to point to the new element. The end result will be something like this (notice that the "horse" element doesn't change!):

![Insertion into a linked lists](https://github.com/philipd/r-n-r/raw/master/images/linked-list-insertion.png)

Deletion is even easier. Just change one reference! Although you might need to manually erase the 'deleted' element from memory if you language doesn't perform automatic garbage collection:

![Deletion from a linked list](https://github.com/philipd/r-n-r/raw/master/images/linked-list-deletion.png)

So, how is a linked list different from an array? And what advantages and disadvantages does it have? To answer those questions, it might be helpful to look at arrays in closer detail. But first, a disclaimer ...

## Caveat
If your coding experiences so far have been chiefly with languages like JavaScript, Python, Java, C#, and PHP (the most popular programming languages, in other words!), then some of the things I say about arrays in this article might seem outright incorrect. The truth is that these languages operate at a very high level of abstraction, meaning that they secretly do a lot of complicated things with your computer's resources (such as its memory) while hiding the details from you so that the code is easier to read, write, and manage. In contrast, more traditional languages that compile to machine code, like C or C++, require you to manage the computer's resources much more directly and explicitly. It's not unlike  the difference between driving a stick-shift and an automatic; the car is still changing gear ratios, but if you're driving an automatic, you don't need to think about it or even be aware that it's happening.

We'll come back to discuss arrays and linked lists in the context of JavaScript later in this article. For now, we're going to "drive stick" and assume that we're storing data in memory in a direct way similar to how we would do it in a language like C.

## A Re-Introduction to Arrays
An array is a collection of data points stored in a contiguous block of memory. Here's an example of a list of names stored in an array:

Address in Memory | Value
--- | --- 
0x3523 | 'Francoise'
0x3524 | 'Rohit'
0x3525 | 'Hae Lim'

Notice that the addresses are consecutive. This is important, as it's how our data has a sense of *order*. We can deal with ideas like *before*, *after*, *next*, or *previous*, and answer questions like "which name comes after 'Francoise'"?

Arrays have a specific problem, however: insertion is time-consuming. You've probably encountered this problem in your own life in fairly mundane circumstances without realizing it. Imagine you've hand-written a list of your favorite movies of all time:
1. Face/Off
2. Wild at Heart
3. Raising Arizona
4. Vampire's Kiss
5. Adaptation

But then you realize you forgot to list your second-favorite of all-time: *Con Air*! Now you have to re-number almost the *entire* list so you can fit *Con Air* in:
1. Face/Off
2. Con Air 
3. Wild at Heart
4. Raising Arizona
5. Vampire's Kiss
6. Adaptation

Arrays suffer the same problem. If you want to insert a value in between two existing ones, *all* the subsequent values have to be individually re-assigned. It's as if you have a DVD rack with individual slots to store your lovingly alphabetized collection, but then one day you come home with a copy of *National Treasure* and have to do the very un-fun work of moving half your collection down a slot one DVD at-a-time.

Another problem with arrays comes from the fact that they are stored in a fixed range of memory locations. When we create an array in a language like C, we specify how big the array will be, and the array is essentially defined as "everything from position X in memory to position Y." That's how our program is able to have a well-defined notion of "first," "last," and "length." 

But what if we need more room? "No problem! Just make the array bigger! So if our array sits at 0x01 to 0x05, and we need two extra slots, re-define it to be positions 0x01 to 0x07."

Unfortunately, it's not that simple, because those places in memory are probably already being used by something else. So we need to create *a completely new array* and copy everything from the smaller one to the bigger one. Oof.

## Arrays vs. Linked Lists
By this point, you might be squarely on Team Linked List. But linked lists have problems of their own. If you haven't thought of any yourself yet, I encourage you to give it some thought before continuing.

Perhaps the most obvious disadvantage to linked lists is that we can only step through them in one direction, because each element contains a reference only to the next element, not the previous one. This also means that appending to the list is *much* more time-consuming that prepending. We can actually solve these problems by creating a *doubly-linked list*, which, as its name implies, is a list where each element contains a reference to both the following *and* preceding elements. This does, however, significantly increase the memory footprint of the data, as we have to store twice as many references.

Unfortunately, linked lists have another set of disadvantages that can't be solved by implementing a doubly-linked list; they still require us to step through the list item-by-item to answer simple questions like, "how long is the list?" or "which value is stored at the 100th position?" As our list grows larger and larger, these questions become more and more time-consuming to calculate. Arrays, by contrast, can answer these questions in a fixed time no matter the size of the array. If your array is stored in memory locations 3021 through 5042, for example, you can calculate the length by subtracting: 5042 - 3021. And you can get the value at any position by similarly trivial arithmetic: the item at position 150 would be at 3021 + 150.



## Arrays and Linked Lists in JavaScript

So, linked lists and arrays both have their respective advantages and disadvantages. But do these differences matter in languages like JavaScript, where data types are determined dynamically and memory allocation is managed automatically? How does JavaScript even create arrays, if we don't have to specify their size when we declare them?

The answer may depend greatly on which particular JavaScript engine your code ends up running on. About 20 years ago, Mozilla's engine implemented "arrays" with plain objects. In contrast, modern engines like Chrome's V8 achieve higher performance by inferring what kind of array you need and actually creating one in memory. So if you initialize an array that happens to contain nothing but integers, V8 will create an integer array. But if you add a floating-point number to the same array, V8 will make a new array to support the wider range of data types that you're storing. V8 also hides the fact that arrays in memory have a fixed size by creating new arrays behind the scenes whenever your data gets too big to fit, and even pre-emptively avoids this extra effort by routinely creating larger arrays than you actually ask for.

If we implement linked lists in Javascript, we won't get these kinds of performance enhancements. So is it even worth it to try? I decided to find out myself.

### Testing Data Insertion

To test the performance of linked lists in JavaScript, I created a [JavaScript class](https://github.com/philipd/linked-list) to implement a singly-linked list data structure, then performed various tasks to compare it to JavaScript's built-in arrays. With an array containing a million randomly-generated strings, making a thousand additional insertions into the middle of the array took roughly 2 seconds. Performing the same number of insertions into a linked list of the same length took roughly 7 *milliseconds*. Wow!

It's worth clarifying, however, that insertion into a linked list can be either time-consuming or practically instantaneous depending on what information you begin with. If you already have a reference to the location in memory where you want to insert your new element, insertion is a cinch, no matter the size of your list; just change a couple of reference pointers and you're done! But if you only know the *ordinal position* where you want to perform your insertion, then insertion can be time-consuming because you need to step through the list to find the appropriate location in memory. And the longer your list is, the longer it will take.

So what about this more difficult scenario, where we know we want to insert to the *n*th place in the list, but have to step through the list to get the appropriate reference location? Performance in this scenario will vary greatly depending on how far down the list we need to step before performing the insertion, but we can get a good idea of the average by inserting in the exact middle of the list. In my tests, the results showed that a thousand of these step-through insertions took about 4.4 seconds, several orders of magnitude longer than insertion by reference, but comparable to array insertion.

The fact that insertion into an array and insertion into a linked list by ordinal position have comparable execution times shouldn't be surprising when we consider what computer scientiests call *time complexity*. We've actually discussed time complexity already, albeit indirectly, but here's a brief summary: a program's time complexity describes how its execution time changes as the size of its input data grows. If a program takes the same amount of time to complete no matter how much data you give it, that's *constant time*. On the other hand, if the execution time increases at a steady rate as the amount of input data grows, that's *linear time*. There are many other classes of time complexity such as exponential and logarithmic, but for now we only need to understand constant and linear time. 

So, back to arrays and linked lists! It turns out that insertion into an array and insertion into a linked list by ordinal position have the same time complexity; they are both linear, even though the contents of the array need to be copied and re-written piecewise to a new location in memory. In both cases, we are stepping through the data one-by-one, and the execution time grows in proportion to the quantity of data. While insertion into a full array comes with the additional overhead of not only *reading* the data but also *writing* it to a new location in memory, this does not increase the task's time complexity, and furthermore, modern JavaScript engines' performance optimizations for arrays likely give them some serious muscle over custom data structures implemented as objects.

### Appending and Prepending

Let's look at appending and prepending next. There's an interesting pattern to the relative performance of arrays and lists in this regard:

. | Array | List 
 --- | --- | ---
 Appending | 0.2 ms | 9256.2 ms
 Prepending | 2911.2 ms | 0.4 ms

A list is evidently really bad at appending, because the location of the last element can only be found by stepping through the entire list. An array, on the other hand, is really bad at *prepending* since all the data has to "scootch over" to make room.

But wait! The distinction between 'append' and 'prepend' in linked lists is largely arbitrary. If we're mostly interested adding data to the end of our list, there's no reason not to pretend our entire linked list is backwards and that the "first" element is actually the last one. What kind of pattern might we notice if we compare the data in this situation?

. | Array | Backwards List 
 --- | --- | ---
 Appending | 0.2 ms | 0.4 ms
 Prepending | 2911.2 ms | 9256.2 ms

This visualization lets us really see the power of V8's array optimizations. Because we need to create a new array every time our array reaches capacity, appending large amounts of data to an array shouldn't be faster than appending to our backwards list. But because V8 offers performance enhancements such as creating arrays with plenty of room to spare, repetitive re-initialization of arrays isn't much of a concern.

Don't count linked lists out just yet, however. Recall that we can create a *doubly-linked* list, allowing us to traverse the list from either end. Such a data structure makes it just as easy to prepend as to append. I haven't implemented a doubly-linked list so I can't run the tests, but we can safely assume the results would look something like this:
. | Array | Doubly-Linked List 
 --- | --- | ---
 Appending | 0.2 ms | 0.4 ms
 Prepending | 2911.2 ms | 0.4 ms

 *Here* is a clear use case for linked lists in JavaScript. If we need to do lots of append and prepend operations, a doubly-linked list is the obvious choice.


## Conclusions

Arrays and linked lists both have their own strengths and weaknesses. A linked list performs better when the collection may grow to an unpredictable size, and can be incredibly efficient at data insertion, appending, and prepending. It's important to remember, however, that high-level programming languages may offer performance optimizations for built-in data structures that aren't available to custom ones, so programmers should not assume that implementing a linked list will give them any practical performance advantage.

## Sources Consulted

- [Linked Lists (Computerphile)](https://www.youtube.com/watch?v=_jQhALI4ujg)
- [EXTRA BITS - Linked Lists and Arrays (Computerphile)](https://www.youtube.com/watch?v=jiHuPbUGlBE)
- [How are JavaScript arrays represented in physical memory? (Stack Overflow)](https://stackoverflow.com/questions/20321047/how-are-javascript-arrays-represented-in-physical-memory)
- [Arrays vs Linked Lists (Computerphile)](https://www.youtube.com/watch?v=DyG9S9nAlUM)
- [JavaScript Array Performance Oddities (qooxdoo)](https://news.qooxdoo.org/javascript-array-performance-oddities-characteristics-d8139757b238)
- [Array - Javascript (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [How do JavScript arrays work under the hood? (Ryan Peden)](https://ryanpeden.com/how-do-javascript-arrays-work-under-the-hood/)
- [Array data structure (Wikipedia)](https://en.wikipedia.org/wiki/Array_data_structure)
- [Linked lists (Wikipedia)](https://en.wikipedia.org/wiki/Linked_list)