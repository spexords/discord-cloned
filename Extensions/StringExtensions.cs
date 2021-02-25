using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Extensions
{
    public static class StringExtensions
    {
        public static string ToSHA256(this string str)
        {
            if (str == null)
            {
                return "";
            }
            using (var sha256 = new SHA256Managed())
            {
                return BitConverter.ToString(sha256.ComputeHash(Encoding.UTF8.GetBytes(str))).Replace("-", "");
            }
        }
    }
}
