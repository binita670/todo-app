"use strict";(()=>{function s(t="Something went wrong."){$.toast({heading:"Error",text:t,showHideTransition:"plain",icon:"error",position:"bottom-center"})}function l(t="Something went wrong."){$.toast({heading:"Warning",text:t,showHideTransition:"plain",icon:"warning",position:"bottom-center"})}function c(t="The update is complete."){$.toast({heading:"Success",text:t,showHideTransition:"plain",icon:"success",position:"bottom-center"})}$(function(t){$("#add-form").submit(function(o){o.preventDefault();let i=$('input[name="name"]').val(),n=$('input[name="description"]').val(),r=$('input[name="deadline"]').val();$.ajax({url:"/api/v1/todo",type:"POST",contentType:"application/json",data:JSON.stringify({name:i,description:n,deadline:r}),success:e=>{console.log(e.data),c("Item added to Todo list successfully.")},error:e=>{console.log(e),s(e)}})}),$("#edit-form").submit(function(o){o.preventDefault();let i=$('input[name="id"]').val(),n=$('input[name="name"]').val(),r=$('input[name="description"]').val(),e=$('input[name="deadline"]').val();$.ajax({url:`/api/v1/todo/${i}`,type:"PUT",contentType:"application/json",data:JSON.stringify({name:n,description:r,deadline:e}),success:a=>{console.log(a.data),c("Item edited successfully.")},error:a=>{console.log(a),s(a)}})}),$("#delete-form").submit(function(o){o.preventDefault();let i=$('input[name="id"]').val();$.ajax({url:`/api/v1/todo/${i}`,type:"DELETE",success:n=>{console.log(n),c("Item deleted successfully.")},error:n=>{console.log(n),s(n)}})})});})();
