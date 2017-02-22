from setuptools import setup, find_packages

setup(
    name='tfra2bpflask',
    version='1.0.0',
    url='https://github.com/amitassaraf/the-first-real-angular2-boilerplate',
    license='MIT',
    author='Amit Assaraf & Ran Amos',
    description='A simple, complete, Angular 2 & Flask boilerplate featuring Sass, Pug, TypeScript, Webpack 2',
    long_description=__doc__,
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    platforms='any',
    install_requires=[
        'Flask', 'gunicorn', 'tornado'
    ],
    classifiers=[
        'Development Status :: 4 - Beta',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Topic :: Software Development :: Libraries :: Python Modules'
    ],
    entry_points='''
        [console_scripts]
        flask=flask.cli:main
    '''
)
