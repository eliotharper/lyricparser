# SSJS Lyric Parser for Salesforce Marketing Cloud

I recently participated in a contest organised by the [HowToSFMC](https://www.howtosfmc.com/) community, where participants had to display the lyrics of [One More Time](https://genius.com/Daft-punk-one-more-time-lyrics) using Server-Side JavaScript (SSJS) in Salesforce Marketing Cloud, in an efficient manner.

## Approach
My initial observation when I approached this challenge was that while the chorus and bridge in the song lyrics are short and repetitive, they follow an irregular pattern. 

To present the lyrics in a manner that they could be reconstructed, I firstly identified distinct lines in the lyrics and stored them in an array — arrays are a great fit for this task, as they provide a very convenient method of storing multiple values in a single variable.

```
var lyrics = [
   "One more time",
   "We're gonna celebrate",
   "Oh yeah, all right",
   "Don't stop the dancing",
   "Oh yeah",
   "Mmm, you know I'm just feeling",
   "Celebration tonight",
   "Celebrate",
   "Don't wait too late",
   "Mmm, no",
   "We don't stop",
   "You can't stop",
   "Celebration",
   "You know we're gonna do it right, tonight",
   "Hey! Just feeling",
   "Music's got me feeling the need",
   "Need, yeah",
   "Come on, all right",
   "Celebrate and dance so free",
   "Music's got me feeling so free"
]
```

My next task was to reassemble these distinct lines back to their original order. The simple option would have been to create a different array of indices from the first array and then output them. For example, the following lyrics:

> One more time  
> Music’s got me feeling so free  
> We’re gonna celebrate  

…could be stored in an array based on their zero-based index in the `lyrics` array. Then this array could be looped to retrieve the corresponding line and output with a line break, like the following example:

```
var order = [0, 19, 1]

for (var i = 0; i < order.length; i++) {
  Write(lyrics[order[i]] + '\n');
}
```

While this is simple, the issue is that there are a total of 112 lines (excluding paragraph breaks). However, from studying the lyric patterns, I observed two pattern formations:

1. A repeat pattern, where a set of lines were repeated two or more times, and
2. An increment pattern, where a set of lines in the `lyrics` array were used consecutively.

To take advantage of these patterns, I optimized my code by creating separate functions for each pattern. 

## Repeat Function
To display repeating lines, I created a `repeat` function which accepts three arguments: 

1. An array of line indices (of the `lyrics` array), represented by the  `arr` parameter,
2. The number of times to repeat the lines, represented by the  `count` parameter, and
3. An optional integer that inserts a line break after a section of repeated lines, represented by the `line` parameter.

The function is provided below.

```
function repeat(arr, count, line) {
   for (i = 0; i < count; i++) {
      for (j = 0; j < arr.length; j++) {
         order.push(arr[j]);
      }
      if (line === i + 1) {
         order.push(-1);
      }
   }
}
```

If the `line` parameter is included, then a `-1` index is appended to the array which will insert a line break, which I’ve detailed in my explanation of the output function. As arrays in JavaScript are zero based, I included an addition operator ( `+` ) to add a value of 1 to the evaluated expression condition, largely for readability (to simply define after which line set the paragraph break should appear).

For example, the following code:

```
repeat([0, 19, 1, 18], 6, 2);
```

…will repeat lines 0, 19, 1 and 18 from the `lyrics` index six times. Additionally, a paragraph break will be inserted after the second line set, resulting in the following output:

> One more time  
> Music’s got me feeling so free  
> We’re gonna celebrate  
> Celebrate and dance so free `// end of 1st line set`  
> One more time  
> Music’s got me feeling so free  
> We’re gonna celebrate  
> Celebrate and dance so free `// end of 2nd line set`  
>  `// line break inserted here`  
> One more time  
> Music’s got me feeling so free  
> We’re gonna celebrate  
> Celebrate and dance so free  `// end of 3rd line set`  
> …  
> One more time  
> Music’s got me feeling so free  
> We’re gonna celebrate  
> Celebrate and dance so free `// end of 6th line set`  

When the function is invoked, the resulting indices are added to the `order` array using the JavaScript `push()` method. 

## Increment Function
The increment function accepts two arguments:

1. A starting index number (from the `lyrics` array), and
2. An ending index number.

The function is provided below.

```
function increment(start, end) {
   for (i = start; i < end + 1; i++) {
      order.push(i);
   }
}
```

When the function is invoked, the corresponding indices are added to the `order` array using the JavaScript `push()` method.  For example, the following code:

```
increment(5, 11)
```

…will return lines 5–11 from the `lyrics` index, resulting in the following output:

> Mmm, you know I’m just feeling  
> Celebration tonight  
> Celebrate  
> Don’t wait too late  
> Mmm, no  
> We don’t stop  
> You can’t stop  

## Output Function
The final task is to output the lines from the lyrics array in the order that they appear in the `order` array.

To achieve this, an empty `result` array is defined to store the resulting strings. The function accepts a single `arr` parameter (the array of line indices), and adds each line to the `result` array using the JavaScript `push()` method. 
 
The function is provided below.

```
function output(arr) {
   var result = [];
   for (i = 0; i < arr.length; i++) {
      result.push(lyrics[arr[i]]);
   }
   return result.join('\n');
}
```

The `result` array now contains an ordered array of lines to display. For example, including  `Write(Stringify(result))` in the function will return the following output:

```
["One more time",
"One more time",
null,
"One more time",
"We're gonna celebrate",
"Oh yeah, all right",
...
"Music's got me feeling so free",
"We're gonna celebrate",
"Celebrate and dance so free"]
```

Note that where paragraph breaks are required, the index value was defined as `-1` which returns a null value (as it is not in the `lyrics` array).

The final step is to join the values in the array and insert line breaks between each one. The JavaScript `join()` method converts the values of an array into a string. Additionally, a separator parameter is passed to the array to separate each line with a new line character (`\n`) . And for paragraph breaks (indicated by an array value of `null`), then this results in two consecutive line break characters, which form a paragraph break.

Finally, the function is invoked by the following code, which retrieves the resulting string from the `output()` function and uses the `Write` utility function (provided by the SSJS Core Library) to output the resulting lyrics in the correct order.

## Learnings
While this task doesn’t have any practical context in my day-to-day platform development (I’ve never had to output song lyrics before!), it was very helpful in creating a thought process of how to parse datasets containing similar characteristics and process them in an optimal way. I look forward to applying this development pattern in future applicable projects! 

## Script
The complete SSJS code is provided below.

```

```