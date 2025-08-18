from django.http import JsonResponse


class SessionExpiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path

        # Allow homepage `/` and any `/api/` routes without check
        if path == '/' or path.startswith('/api/'):
            return self.get_response(request)

        # For all other paths, check if the user is authenticated
        if not request.user.is_authenticated:
            if request.headers.get('x-requested-with') == 'XMLHttpRequest' or request.accepts('application/json'):
                return JsonResponse({'detail': 'Session expired'}, status=401)
            else:
                # Redirect unauthenticated users to login page (for HTML)
                from django.shortcuts import redirect
                return redirect('/login')

        return self.get_response(request)