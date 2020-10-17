## Introduction
If you've spent more than a couple of hours in your life coding, then you've almost certainly heard of arrays. Arrays are just one example of a *data structure*--a way of collecting multiple pieces of data together in an organized way so we can use them more effectively. Objects, hashes, and dictionaries are other examples of data structures. In this article, we'll take a quick look at a data structure that you might be less familiar with: the *linked list*.

## Basics
The basic idea behind linked lists is disarmingly simple: store each piece of data together with a reference to the location of the next piece of data. All we need to know is the location of the first piece of data, and we can find the rest by following the references. It's a bit like a treasure hunt where each hidden clue tells you the location of the next clue.

Here's an example of a linked list:

![An example of a linked list](https://github.com/philipd/r-n-r/raw/master/images/linked-list.png)

(In case you're wondering, '0x' is a common convention for notating [hexadecimal numbers](https://en.wikipedia.org/wiki/Hexadecimal))

Inserting new values into the middle of the list is easy as pie; just copy the reference in the preceding element to the new element, then change the reference in the preceding element to point to the new element. The end result will be something like this:

![Insertion into a linked lists](https://github.com/philipd/r-n-r/raw/master/images/linked-list-insertion.png)

Deletion is even easier. Just change one reference! Although you might need to manually erase the 'deleted' element from memory if you language doesn't perform automatic garbage collection:

![Deletion from a linked list](https://github.com/philipd/r-n-r/raw/master/images/linked-list-deletion.png)

So, how is a linked list different from an array? And what advantages and disadvantages does it have?

## A Caveat
If your coding experiences so far have been chiefly with languages like JavaScript, Python, Java, C#, and PHP (the most popular programming languages, in other words!), then some of the information on data structures in this article might seem outright incorrect. The truth is that these languages operate at a very high level of abstraction, meaning that they secretly do a lot of complicated things with your computer's resources (such as its memory) while hiding the details from you so that the code is easier to read, write, and manage. In contrast, more traditional languages that compile to machine code, like C or C++, require you to manage the computer's resources much more directly and explicitly. It's not unlike  the difference between driving a stick-shift and an automatic; the car is still changing gear ratios, but if you're driving an automatic, you don't need to think about it or even be aware that it's happening.

We'll come back to discuss arrays and linked lists in the context of JavaScript later in this article. For now, we're going to "drive stick" and assume that we're storing data in memory in a direct way similar to how we would do it in a language like C.

## Arrays
Before we examine linked lists, it might be helpful to clarify a few things about arrays, because the two are very often compared with each other, having similar use cases but their own advantages and disadvantages.

An array is a collection of data points stored in a contiguous block of memory. Here's an example of a list of names stored in an array:

Address in Memory | Value
--- | --- 
3423 | 'Francoise'
3524 | 'Rohit'
3625 | 'Hae Lim'

Notice that the addresses are consecutive. This is important, as it's how our data has a sense of "order." In other words, it's how we answer questions like "which name is first in the list?" and "which name is third?"

Arrays are stored in a fixed range of memory locations. When we create an array in a language like C, we specify how big the array will be, and the array is essentially defined as "everything from position X in memory to position Y."



## Caveat
Languages like JavaScript, Python, Java, C#, and PHP (the most popular programming languages, in other words!) operate at a very high level of abstraction, meaning that they secretly do a lot of complicated things with your computer's resources (such as its memory) while hiding the details from the programmer so that the code is easier to read, write, and manage. In contrast, more traditional languages that compile to machine code, like C or C++, require the programmer to manage the computer's resources much more directly and explicitly. It's not unlike  the difference between driving a stick-shift and an automatic; the car is still changing gear ratios, but if you're driving an automatic, you don't need to think about it or even be aware that it's happening.

In this article, I'll be "driving stick" and talking specifically about data structures as they would exist in memory in the context of a language like C.

## Ordered Structures

Arrays & linked lists share an important feature: they both allow us to store data in a specific order. 

Arrays have a specific problem, however: insertion is time-consuming. You've probably encountered this problem in your own life in fairly mundane circumstances without realizing it. Imagine you've written a list of your favorite films:
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

Arrays suffer the same problem. If you want to insert a value in between two existing ones, *all* the subsequent values have to be individually re-assigned. And to make matters worse, if the array is full, it has to be re-sized, which generally means re-allocating the entire thing. On the other hand, modifying existing data is easy, and so is looking up specific values.

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