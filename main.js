<script language='javascript' runat='server'>
Platform.Load('Core', 1);

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

var order = [0, 0, -1];
repeat([0, 1, 2, 3], 3);
order.push(0, 1, 4, 0);
increment(-1, 3);
order.push(0, 1, 4, 3, 0, -1);
increment(5, 11);
order.push(1, 0, 0, 0);
increment(12, 17);
order.push(1, 0, 18, 19, 18);
repeat([0, 19, 1, 18], 9, 5);
order.push(0, 19, 1);
repeat([0, 19, 1, 18], 6, 2);

Write(output(order));

var i, j;

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

function increment(start, end) {
   for (i = start; i < end + 1; i++) {
      order.push(i);
   }
}

function output(arr) {
   var result = [];
   for (i = 0; i < arr.length; i++) {
      result.push(lyrics[arr[i]]);
   }
   return result.join('\n');
}
</script>