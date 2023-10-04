import { Error, Success } from './toast';

$(function(e) {
    $('#add-form').submit(function (e) {
        e.preventDefault();
        const name = $('input[name="name"]').val();
        const description = $('input[name="description"]').val();
        const deadline = $('input[name="deadline"]').val();
        $.ajax({
            url:'/api/v1/todo',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name,
                description,
                deadline
            }),
            success: (response) => {
                console.log(response.data);
                Success("Item added to Todo list successfully.");
            },
            error: (error) => {
                console.log(error);
                Error(error)
            }
        });
    });

    $('#edit-form').submit(function (e) {
        e.preventDefault();
        const id = $('input[name="id"]').val();
        const name = $('input[name="name"]').val();
        const description = $('input[name="description"]').val();
        const deadline = $('input[name="deadline"]').val();
        $.ajax({
            url:`/api/v1/todo/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                name,
                description,
                deadline
            }),
            success: (response) => {
                console.log(response.data);
                Success("Item edited successfully.");
            },
            error: (error) => {
                console.log(error);
                Error(error)
            }
        });
    });

    $('#delete-form').submit(function (e) {
        e.preventDefault();
        const id = $('input[name="id"]').val();
        $.ajax({
            url:`/api/v1/todo/${id}`,
            type: 'DELETE',
            success: (response) => {
                console.log(response);
                Success("Item deleted successfully.");
            },
            error: (error) => {
                console.log(error);
                Error(error)
            }
        });
    });
});