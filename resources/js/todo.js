import { toastError, toastSuccess } from './toast';

const formatError = (error) => {
    if(error.status === 422) {
        return error.responseJSON.errors.map(err => err.msg).join('\n');
    }
    return error.message;
}

$(function(e) {
    $('#add-form').submit(function (e) {
        e.preventDefault();
        const name = $('#add-form input[name="name"]').val();
        const description = $('#add-form input[name="description"]').val();
        const deadline = $('#add-form input[name="deadline"]').val();
        $.ajax({
            url:'/api/v1/todos',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name,
                description,
                deadline
            }),
            success: (response) => {
                console.log(response.data);
                toastSuccess("Item added to Todo list successfully.");
            },
            error: (error) => {
                toastError(formatError(error));
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
            url:`/api/v1/todos/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                name,
                description,
                deadline
            }),
            success: (response) => {
                console.log(response.data);
                toastSuccess("Item edited successfully.");
            },
            error: (error) => {
                toastError(formatError(error));
            }
        });
    });

    $('#delete-form').submit(function (e) {
        e.preventDefault();
        const id = $('input[name="id"]').val();
        $.ajax({
            url:`/api/v1/todos/${id}`,
            type: 'DELETE',
            success: (response) => {
                toastSuccess("Item deleted successfully.");
            },
            error: (error) => {
                toastError(formatError(error));
            }
        });
    });

    $('.done-checkbox').on('click', function(e) {
        e.preventDefault();
        const id = $(this).data('id');
        $.ajax({
            url:`/api/v1/todos/change-status/${id}`,
            type: 'PUT',
            success: (response) => {
                toastSuccess("Status changed successfully.");
            },
            error: (error) => {
                toastError(formatError(error));
            }
        });
    });
});