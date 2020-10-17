## Introduction
If you've spent more than a couple of hours in your life coding, then you've almost certainly heard of arrays. Arrays are just one example of a *data structure*--a way of collecting multiple pieces of data together in an organized way so we can use them more effectively. Objects, hashes, and dictionaries are other examples of data structures. In this article, we'll take a quick look at a data structure that you might be less familiar with: the *linked list*.

## What is a linked list?
The basic idea behind linked lists is disarmingly simple: store each piece of data together with a reference to the location of the next piece of data. All we need to know is the location of the first piece of data, and we can find the rest by following the references. It's a bit like a treasure hunt where each hidden clue tells you the location of the next clue.

Here's an example of a linked list:

![An example of a linked list](https://github.com/philipd/r-n-r/raw/master/images/linked-list.png)

(In case you're wondering, '0x' is a common convention for notating [hexadecimal numbers](https://en.wikipedia.org/wiki/Hexadecimal))

Inserting new values into the middle of the list is easy as pie; just copy the reference in the preceding element to the new element, then change the reference in the preceding element to point to the new element. The end result will be something like this (notice that the "horse" element doesn't change!):

![Insertion into a linked lists](https://github.com/philipd/r-n-r/raw/master/images/linked-list-insertion.png)

Deletion is even easier. Just change one reference! Although you might need to manually erase the 'deleted' element from memory if you language doesn't perform automatic garbage collection:

![Deletion from a linked list](https://github.com/philipd/r-n-r/raw/master/images/linked-list-deletion.png)

So, how is a linked list different from an array? And what advantages and disadvantages does it have? To answer those questions, it might be helpful to look at arrays in closer details. But first, a disclaimer ...

## Caveat
If your coding experiences so far have been chiefly with languages like JavaScript, Python, Java, C#, and PHP (the most popular programming languages, in other words!), then some of the things I say about arrays in this article might seem outright incorrect. The truth is that these languages operate at a very high level of abstraction, meaning that they secretly do a lot of complicated things with your computer's resources (such as its memory) while hiding the details from you so that the code is easier to read, write, and manage. In contrast, more traditional languages that compile to machine code, like C or C++, require you to manage the computer's resources much more directly and explicitly. It's not unlike  the difference between driving a stick-shift and an automatic; the car is still changing gear ratios, but if you're driving an automatic, you don't need to think about it or even be aware that it's happening.

We'll come back to discuss arrays and linked lists in the context of JavaScript later in this article. For now, we're going to "drive stick" and assume that we're storing data in memory in a direct way similar to how we would do it in a language like C.

## A Re-Introduction to Arrays
An array is a collection of data points stored in a contiguous block of memory. Here's an example of a list of names stored in an array:

Address in Memory | Value
--- | --- 
3423 | 'Francoise'
3524 | 'Rohit'
3625 | 'Hae Lim'

Notice that the addresses are consecutive. This is important, as it's how our data has a sense of *order*. We can deal with ideas like *before*, *after*, *next*, or *previous*, and answer questions like "which name comes after "Francoise"?

Arrays have a specific problem, however: insertion is time-consuming. You've probably encountered this problem in your own life in fairly mundane circumstances without realizing it. Imagine you've written a list of your favorite movies of all time:
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

But what if we need more room? "No problem! Just make the array bigger! So if our arrays sits at 0x01 to 0x05, and we need two extra slots, re-define it to be positions 0x01 to 0x07."

Unfortunately, it's not that simple, because those places in memory are probably already being used by something else. So we need to create *a completely new array* and copy everything from the smaller one to the bigger one. Oof.

## Arrays vs. Linked Lists
By this point, you might be squarely on Team Linked List. But linked lists have problems of their own. If you haven't thought of any yourself yet, I encourage you to give it some thought before continuing.

Perhaps the most obvious disadvantage to linked lists is that we can only step through them in one direction, because each element contains a reference only to the next element, not the previous one. We can actually solve this problem by creating a *doubly-linked list*, which, as its name implies, is a list where each element contains a reference to both the following *and* preceding elements. This does, however, significantly increase the memory footprint of the data, as we have to store twice as many references.

Unfortunately, linked lists have another set of disadvantages that can't be solved by implementing a doubly-linked list; they still require us to step through the list item-by-item to answer simple questions like, "how long is the list?" or "which value is stored at the 100th position?" As our list grows larger and larger, these questions become more and more time consuming to calculate: they are O(n). Arrays, by contrast, can answer these questions in a fixed *O(1)* time no matter the size of the array. If your array is stored in memory locations 3021 through 5042, for example, you can calculate the length by subtracting: 5042 - 3021. And you can get the value at any position by similarily trivial arithmetic: the item at position 150 would be at 3021 + 150.

## Arrays and Linked Lists in JavaScript

So, linked lists and arrays both have their respective advantages and disadvantages. But do these differences matter in languages like JavaScript, where data types are determined dynamically and memory allocation is managed automatically? How does JavaScript even create arrays, if we don't have to specify their size when we declare them?

The answer may depend greatly on which particular JavaScript engine you're using. About 20 years ago, Mozilla's engine implemented "arrays" with plain objects. Modern engines like V8 achieve higher performance by inferring what kind of array you need and actually creating in memory. So, if you initialize an array that happens to contain nothing but integers, V8 will create an integer array. But if you add a floating-point number to the same array, V8 will make a new array to support the wider range of data types that you're storing. V8 also hides the fact that arrays in memory have a fixed size by creating new arrays behind the scenes whenever your data gets too big to fit.

If we implement linked lists in Javascript, we won't get these kind of performance enhancements. So is it even worth it to try?

The answer, surprisingly, may be "yes."

## Linked Lists
Address in Memory | Value
--- | ---
1003 | 'Hae Lim', 0000
... | ...
2533 | 'Francoise', 5239
... | ...
5239 | 'Rohit', 1003

## Array
Address in Memory | Value
--- | --- 
3423 | 'Francoise'
3524 | 'Rohit'
3625 | 'Hae Lim'