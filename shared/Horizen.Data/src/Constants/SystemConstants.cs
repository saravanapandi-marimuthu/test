namespace Horizen.Data.Constants
{
    public static class SystemConstants
    {
        public static readonly Guid SystemCompanyId = GetSystemCompanyId();

        private static Guid GetSystemCompanyId()
        {
            string allOnesString = new string('1', 32);
            return new Guid(allOnesString);
        }
    }
}
