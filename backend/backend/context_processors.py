import os 

def export_vars(request):
    data = {}
    data['FRONTEND_HOST'] = os.environ['FRONTEND_HOST']
    return data