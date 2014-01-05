---
layout: post
title: "Getting Started With Go"
date: 2014-01-05 05:59:43 -0200
---

Following the [New Year's promise](http://localhost:4000/2014/01/01/first/),
I've already began studying [Go](http://golang.org).


### What I've learned so far

Go is a modern compiled language, developed at Google.
It's syntax is like so:

{% highlight go %}
package main

import "fmt"

fun sum (a, b int) int {
	return a+b;
}

fun main () {
	a := sum(2,3)
}

{% endhighlight %}

### Resources for learning

What geek doesn't love a list of resources, right?

- [A Tour Of Go](http://tour.golang.org/)

- [GoLang website](http://golang.org)

Oh, and THIS:

- ["Public Static Void"](http://www.youtube.com/watch?v=5kj5ApnhPAE), a small
talk at OSCON'10 by Rob Pike, from Google, about Go being prodly statically
typed.

I'll update this as I go on to .

After reading [this](http://jvns.ca/blog/2014/01/04/4-paths-to-being-a-kernel-hacker/),
I've been thinking: what if I wrote a simple SO using Go? =O
