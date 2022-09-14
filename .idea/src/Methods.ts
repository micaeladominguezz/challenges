// CLASSES
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
             this.val = (val===undefined ? 0 : val)
            this.next = (next===undefined ? null : next)
    }
};

class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
};

//Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
// You may assume that each input would have exactly one solution, and you may not use the same element twice.
function twoSum(nums: number[], target: number): number[] {
    const solution: number[] = [];
    for(let int = 0; int < nums.length; int ++){
        const a = target - nums[int];
        if(nums.indexOf(a) != -1 && nums.indexOf(a) != int){
            solution.push(int);
            solution.push(nums.indexOf(a));
            return solution
        }
    }
    return solution
};

//Given an integer x, return true if x is palindrome integer.
// An integer is a palindrome when it reads the same backward as forward.
function isPalindrome(x: number): boolean {
    const numberInString : String = String(x);
    if(numberInString.length == 1) return true
    if(numberInString.charAt(0)  == "-" && numberInString.charAt(1) != '0') return false
    const length : number = numberInString.length -1;
    for(let i: number = 0; i < numberInString.length / 2; i ++ ){
        if(numberInString.charAt(i) != numberInString.charAt(length-i)) return false;
    }
    return true;
};

//Given a roman numeral, convert it to an integer
function romanToInt(s: string): number {
    let finalNumber : number = 0;
    const possibleNumbers : number[] = [];
    for(let i: number = 0; i < s.length ; i ++){
        const newNumber = converTo(s.charAt(i));
        if(possibleNumbers.length == 0){
            possibleNumbers.push(newNumber);
        }else{
            const length = possibleNumbers.length;
            if(possibleNumbers[length - 1] == newNumber){
                possibleNumbers.push(newNumber);
            }else if(possibleNumbers[length -1] > newNumber){
                possibleNumbers.forEach(num => {
                    finalNumber = finalNumber + num;
                });
                possibleNumbers.splice(0, possibleNumbers.length);
                possibleNumbers.push(newNumber);
            }else{
                finalNumber = finalNumber + (newNumber - possibleNumbers.pop());
            }
        }
    }
    if(possibleNumbers.length != 0){
        possibleNumbers.forEach(num => {
            finalNumber = finalNumber + num;
        });
    }
    return finalNumber;

};

function converTo(s: string) : number {
    if(s == 'I') return 1;
    if(s == 'V') return 5;
    if(s == 'X') return 10;
    if(s == 'L') return 50;
    if(s == 'C') return 100;
    if(s == 'D') return 500;
    if(s == 'M') return 1000;
    return 0;
}

//Write a function to find the longest common prefix string amongst an array of strings.
// If there is no common prefix, return an empty string ""
function longestCommonPrefix(strs: string[]): string {
    const min: number = minLength(strs);
    let commonPrefix = "";
    for(let i: number= 0; i < min; i ++){
        const newChar = strs[0].charAt(i);
        strs.forEach(str => {
            if(newChar != str.charAt(i)) return commonPrefix;
        });
        commonPrefix = commonPrefix.concat(newChar);
    }
    return commonPrefix
};

function minLength(s: string[]) : number {
    let minLength = s[0].length;
    s.forEach(str => {
        if(minLength > str.length){
            minLength = str.length;
        }
    });
    return minLength;
}

//You are given the heads of two sorted linked lists list1 and list2.
// Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.
// Return the head of the merged linked list.
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    const numbers : number[] = [];
    if(list2 == null || list2.val == null){
        return list1;
    }
    if(list1 == null || list1.val == null){
        return list2;
    }
    while(list1 != null && list2 != null){
        if(list1.val == list2.val){
            numbers.push(list1.val);
            numbers.push(list2.val);
            list1 = list1.next;
            list2 = list2.next;
        }else if(list1.val > list2.val){
            numbers.push(list2.val);
            list2 = list2.next;
        }else if(list1.val < list2.val){
            numbers.push(list1.val);
            list1 = list1.next;
        }
    }
    if(list1 != null){
        while(list1 != null){
            numbers.push(list1.val);
            list1 = list1.next;
        }
    }
    if(list2 != null){
        while(list2 != null){
            numbers.push(list2.val);
            list2 = list2.next;
        }
    }
    const length: number = numbers.length -1;
    let finalList : ListNode = new ListNode();
    for(let i: number = length; i >= 0; i --){
        if(i == length){
            finalList.val = numbers[i];
        }else{
            finalList = new ListNode(numbers[i], finalList);
        }
    }
    return finalList;
};

//Given an integer array nums and an integer val, remove all occurrences of val in nums in-place. The relative order of the elements may be changed.
function removeElement(nums: number[], val: number): number {
      for(let i : number = 0; i < nums.length; i ++){
        if(nums[i] == val){
            const num_replace = num_to_replace(nums, val, i);
            if(num_replace != -1){
                nums[i] = num_replace;
            }else{
                nums[i] = null;
            }
        }
    }
    return nums.length;
};
function num_to_replace(nums: number[], val:number, index: number): number{
    const length =  nums.length - 1;
    for(let i: number = length; i > -1 ; i --  ){
        if(i == index) return -1;
        const possible_number = nums.pop();
        if( possible_number != val){
            return possible_number;
        }
    }

};

//Given a sorted array of distinct integers and a target value,
// return the index if the target is found. If not, return the index where it would be if it were inserted in order.
function searchInsert(nums: number[], target: number): number {
    if(nums[nums.length -1] < target) return nums.length
    for(let i : number = 0; i < nums.length; i ++){
        if(nums[i] > target || nums[i] == target){
            return i;
        }
    }
};

//Given a string s consisting of words and spaces, return the length of the last word in the string.
// A word is a maximal substring consisting of non-space characters only.
function lengthOfLastWord(s: string): number {
    let counter: number = 0;
    const length: number = s.length - 1;
    for(let i: number = length; i > -1; i --){
        if(s.charAt(i) == " " && counter != 0){
            return counter;
        }
        if(s.charAt(i) != " "){
            counter = counter + 1;
        }
    }
    return counter;
};

//You are given a large integer represented as an integer array digits,
// where each digits[i] is the ith digit of the integer.
// The digits are ordered from most significant to least significant in left-to-right order.
// The large integer does not contain any leading 0's.
function plusOne(digits: number[]): number[] {
    let actual_to_string : string =  from_number_array_to_string(digits);
    actual_to_string = addOne(actual_to_string);
    for(let i : number = 0; i < actual_to_string.length; i ++){
        if(digits.length > i){
            digits[i] = parseInt(actual_to_string.charAt(i));
        }else{
            digits.push( parseInt(actual_to_string.charAt(i)));
        }
    }
    return digits;
};

function from_number_array_to_string(nums: number[]) : string {
    let new_string: string = "";
    for(let i: number = 0; i < nums.length; i ++){
        const num : string = nums[i].toString();
        new_string = new_string.concat(num);
    }
    return new_string;
};

function addOne(s: string) : string {
    const cero: string = "0";
    let new_string : string = "";
    let still_adding : boolean = true;
    for(let i : number = s.length -1 ; i > -1; i --){
        const cha : string = s.charAt(i);
        if(still_adding){
            if(cha == "9"){
                new_string = new_string.concat(cero);
            }else{
                const ch:  number = parseInt(s.charAt(i)) + 1;
                new_string = ch.toString().concat(new_string);
                still_adding = false;
            }
        }else{
            new_string = cha.concat(new_string);
        }
    }
    if(still_adding){
        const one : string = "1";
        new_string = one.concat(new_string);
    }
    return new_string;
};

//Given two binary strings a and b, return their sum as a binary string.
function addBinary(a: string, b: string): string {
    let index: number = 0;
    let carrier: boolean = false;
    const cero: string = "0";
    const one : string = "1";
    const a_length = a.length - 1;
    const b_length = b.length - 1;
    let new_string : string = "";
    while(a.length > index && b.length > index){
        const char_a : string = a.charAt(a_length - index);
        const char_b : string = b.charAt(b_length - index);
        if(char_a == '0' && char_b == '0'){
            if(!carrier){
                new_string = cero.concat(new_string);
            }else{
                new_string = one.concat(new_string);
                carrier= false;
            }
        }else if(char_a == "1" && char_b == "1"){
            if(!carrier){
                new_string = cero.concat(new_string);
                carrier = true;
            }else{
                new_string = one.concat(new_string);
            }
        }else{
            if(!carrier){
                new_string = one.concat(new_string);
            }else{
                new_string = cero.concat(new_string);
            }
        }
        index = index + 1;
    }
    if(a.length > index){
        new_string = sumToString(new_string, a,  carrier, index);
    }
    if(b.length > index){
        new_string = sumToString(new_string, b, carrier, index);
    }
    if(a.length == b.length){
        if(carrier){
            new_string = one.concat(new_string);
        }
    }
    return new_string
};

function sumToString(new_string: string, s: string, c: boolean, i : number){
    let carrier: boolean = c;
    const length : number = s.length - 1;
    let index: number = i;
    const cero: string = "0";
    const one : string = "1";
    while(s.length > index){
        const char_s : string = s.charAt( length - index);
        if(char_s == '0' ){
            if(carrier){
                new_string = one.concat(new_string);
                carrier = false;
            }else{
                new_string = cero.concat(new_string);
            }
        }
        if(char_s == '1' ){
            if(carrier){
                new_string = cero.concat(new_string);
            }else{
                new_string = one.concat(new_string);
            }
        }
        index = index + 1;
    }
    if(carrier){
        new_string = one.concat(new_string);
    }
    return new_string;
};

//Given a non-negative integer x, compute and return the square root of x.
function mySqrt(x: number): number {
    const square : number = Math.sqrt(x);
    return Math.trunc(square);
};

//You are climbing a staircase. It takes n steps to reach the top.
//
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
function climbStairs(n: number): number {
    return fibonacci(n + 1);
};

function fibonacci(n: number): number{
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
};

//Given the head of a sorted linked list, delete all duplicates such that each
// element appears only once. Return the linked list sorted as well.
function deleteDuplicates(head: ListNode | null): ListNode | null {
    let head_aux : ListNode = new ListNode();
    const  nums : number[] = [];
    let i : number = 0;
    while(head != null){
        if(i == 0){
            nums.push(head.val);
            i = i + 1;
        }
        if(i != 0 && !(head.val == nums[i-1])){
            nums.push(head.val);
            i = i + 1;
        }
        head = head.next;
    }
    const length : number = nums.length - 1;
    for(let index : number = length; index > -1; index -- ){
        if(index == length){
            head_aux = new ListNode(nums[index]);
        }else{
            head_aux = new ListNode(nums[index], head_aux);
        }
    }
    return head_aux;

};

//Given the root of a binary tree, return the inorder traversal of its nodes' values.
function inorderTraversal(root: TreeNode | null): number[] {
    const nums : number[] = [];
    if(root == null || root.val == null){
        return nums;
    }else if(root.val != null && root.left == null && root.right == null){
        nums.push(root.val);
        return nums;
    }else{
        inorder(nums, root);
    }
    return nums;
};

function inorder(nums: number[], root: TreeNode | null): void{
    if(root == null || root.val == null) return;
    inorder(nums, root.left);
    nums.push(root.val);
    inorder(nums, root.right);
};

//Given the roots of two binary trees p and q, write a function to check if they are the same or not.
// Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if(p == null && q == null) return true;
    if(p == null || q == null) return false;
    if(p.val != q.val) return false;
    return isSameTree(p.right, q.right) && isSameTree(p.left, q.left);
};

//Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).
function isSymmetric(root: TreeNode | null): boolean {
    return isMirror(root, root)
};
function isMirror(root1: TreeNode | null, root2: TreeNode | null) : boolean{
    if (root1 == null && root2 == null) return true;
    if (root1 != null && root2 != null && root1.val == root2.val)
        return (isMirror(root1.left, root2.right) && isMirror(root1.right, root2.left));
    return false;
};

//Given the root of a binary tree, return its maximum depth.
function maxDepth(root: TreeNode | null): number {
    if (root == null)
        return 0;
    const leftDepth : number = maxDepth(root.left);
    const rightDepth : number = maxDepth(root.right);
    if (leftDepth > rightDepth)
        return (leftDepth + 1);
    else
        return (rightDepth + 1);
};

//Given a binary tree, determine if it is height-balanced.
function isBalanced(root: TreeNode | null): boolean {
    if(root == null || root.val == null) return true;
    return isBalancedRecursive(root) > 0;
}
function isBalancedRecursive(root: TreeNode | null) : number {
    if (root == null)return 0;
    const lh : number= isBalancedRecursive(root.left);
    if (lh == -1) return -1;
    const rh : number = isBalancedRecursive(root.right);
    if (rh == -1) return -1;
    if (Math.abs(lh - rh) > 1) return -1;
    else return Math.max(lh, rh) + 1;
};

//Given a binary tree, find its minimum depth.
function minDepth(root: TreeNode | null): number {
    if (root == null) return 0;
    if (root.left == null && root.right == null) return 1;
    if (root.left == null) return minDepth(root.right) + 1;
    if (root.right == null) return minDepth(root.left) + 1;
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};

//Given the root of a binary tree and an integer targetSum,
// return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (root == null) return false;
    let ans : boolean= false;
    const subSum : number = targetSum - root.val;
    if (subSum == 0 && root.left == null && root.right == null) return (ans = true);
    if (root.left != null){
        ans = ans || hasPathSum(root.left, subSum);
    }
    if (root.right != null){
        ans = ans || hasPathSum(root.right, subSum);
    }
    return ans;
};














