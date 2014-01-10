---
layout: post
title: "Getting Started With Go"
date: 2014-01-05 05:59:43 -0200
---

Following the [New Year resolutions](/blog/2014/01/01/first/),
I've began studying [Go](http://golang.org).

### What I've learned so far

Go is a modern statically-typed compiled language, developed at Google. It's
garbage-collected, . And closures!
Some sample code:

{% highlight go %}
package main

import (
	"fmt"
)

func fibonacci() func() int {
	var last, llast int = 0, 1
	return func() int {
		last, llast = llast+last, last
		return last
	}
}

func main() {
	f := fibonacci()
	for i := 0; i < 10; i++ {
		fmt.Println(f())
	}
}

{% endhighlight %}

### Resources for learning

What godless person doesn't love a list of resources, right?

#### For starters  

- [GoLang Book](http://www.golang-book.com/). An introduction to programming in Go.
- [A Tour Of Go](http://tour.golang.org/) for programmers. 
- [Go by Example](https://gobyexample.com/).

#### For grown-ups  

- [GoLang website](http://golang.org)
- [Go Specification](http://golang.org/ref/spec)
- [Writing Web Applications](http://golang.org/doc/articles/wiki/) in Go

#### Videos  

- ["Public Static Void"](http://www.youtube.com/watch?v=5kj5ApnhPAE), a small
talk at OSCON'10 by Rob Pike, from Google, about Go being prodly statically
typed.
- ["Go for Pythonistas"](https://www.youtube.com/watch?v=elu0VpLzJL8)

After reading [this](http://jvns.ca/blog/2014/01/04/4-paths-to-being-a-kernel-hacker/),
I've been thinking: what if I wrote a simple SO using Go? =O
