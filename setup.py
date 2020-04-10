from distutils.core import setup
from Cython.Build import cythonize

setup(name = 'cellular_cython', ext_modules = cythonize('app/views/dep/cellular_cython.pyx'))
