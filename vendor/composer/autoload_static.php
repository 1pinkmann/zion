<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitce14a608c4835b83c9692c3e6e10aab2
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitce14a608c4835b83c9692c3e6e10aab2::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitce14a608c4835b83c9692c3e6e10aab2::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
