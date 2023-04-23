from rest_framework import status


class ErrorResponseMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        if hasattr(response, "data") and "errors" in response.data:
            response.data = {"errorMessage": response.data["errors"][0]}
            response.status_code = status.HTTP_400_BAD_REQUEST

        if hasattr(response, "data") and "non_field_errors" in response.data:
            response.data = {"errorMessage": response.data["non_field_errors"][0]}
            response.status_code = status.HTTP_400_BAD_REQUEST

        return response
