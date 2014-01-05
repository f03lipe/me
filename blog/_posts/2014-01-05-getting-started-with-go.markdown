---
layout: post
title: "Getting Started With Go"
date: 2014-01-05 05:59:43 -0200
---

Following the [New Year's promise](/blog/2014/01/01/first/),
I've already began studying [Go](http://golang.org).


### What I've learned so far

Go is a modern compiled language, developed at Google.
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

What geek doesn't love a list of resources, right?

- [A Tour Of Go](http://tour.golang.org/)

- [Go by Example](https://gobyexample.com/)

- [GoLang website](http://golang.org)

- [The Spec](http://golang.org/ref/spec)

Oh, and THIS:

- ["Public Static Void"](http://www.youtube.com/watch?v=5kj5ApnhPAE), a small
talk at OSCON'10 by Rob Pike, from Google, about Go being prodly statically
typed.

I'll update this as I go on to .

After reading [this](http://jvns.ca/blog/2014/01/04/4-paths-to-being-a-kernel-hacker/),
I've been thinking: what if I wrote a simple SO using Go? =O
