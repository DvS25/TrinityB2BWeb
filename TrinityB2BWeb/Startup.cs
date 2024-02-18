using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TrinityB2BWeb.Startup))]
namespace TrinityB2BWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
